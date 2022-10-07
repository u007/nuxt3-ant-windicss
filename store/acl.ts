import { defineStore, acceptHMRUpdate } from 'pinia'
import * as Realm from 'realm-web'
import { getRealm } from '~/realm/setup'
import { CartType } from '../models/cart'
import { ProductVariantType } from '../models/productVariant'
import { UserType } from '../models/user'
import { callFunc } from '../realm/data/call'
// import { dataFetchSingle, dataFetchSingleWhere } from '../realm/data/get'

export type UserSession = {
  id: string
  uid: string
  username?: string
  accessToken: string | null
  refreshToken: string | null
  avatar?: string
  teams: []
  customData: UserType
  providerType: string
}

export const useAclStore = defineStore('acl', {
  state: (): {
    loading: boolean,
    currentUser: UserSession,
    loginError: string,
    cartSessionToken: string,
    cart: CartType,
    cartVariants: ProductVariantType[],
  } => {
    return {
      loading: false,
      currentUser: {} as UserSession,
      loginError: '' as string,
      cartSessionToken: '' as string,
      cart: {} as CartType,
      cartVariants: [] as ProductVariantType[],
    }
  },

  getters: {
    currentUserName: (state) => {
      const data = state.currentUser?.customData
      console.log('currentUserName', state.currentUser, data)
      if (state.currentUser && data) {
        
        if (data.firstName && data.lastName) {
          return `${data.firstName} ${data.lastName}`
        }
        return data.firstName
      }
      if (data && data.email) {
        return data.email
      }
      return 'Guest'
    },
    siteCurrencyLabel: () => {
      //TODO
      return 'RM'
      // if (state.currentUser && state.currentUser.customData) {
      //   return state.currentUser.customData.currency
      // }
      // return 'USD'
    }

  },
  actions: {
    async logout() {
      this.loginError = ''
      this.loading = true
      const realm = getRealm()
      try {
        await realm.currentUser?.logOut()
      } catch (err) {
        console.log('logout failed', err)
      } finally {
        await realm.logIn(Realm.Credentials.anonymous())
        this.cart = {}
        this.currentUser = { customData: {} }
        this.loading = true
        this.cartSessionToken = ''
      }
    },

    async checkSession() {
      const realm = getRealm()
      // console.log('checksession', realm.currentUser, this.currentUser.uid)
      if (!realm.currentUser && (this.currentUser?.accessToken || this.currentUser.uid === realm.currentUser?.id)) {
        console.log('user session expired', realm.currentUser?.id, this.currentUser.uid);
        this.logout()
        return false
      }
      if (!realm.currentUser) {
        await realm.logIn(Realm.Credentials.anonymous())
      }
      return true
    },
    clearCart() {
      this.cart = {}
      return callFunc('clearCart', this.cartSessionToken);
    },
    async setCartSession(token: string) {
      this.cartSessionToken = token
      this.currentUser.cartSessionToken = token
    },

    isGuest(): boolean {
      return !this.currentUser.providerType || this.currentUser.providerType === 'anon-user'
    },
    async refetchCurrentUser() {
      const realm = getRealm()
      if (!realm.currentUser) {
        return
      }
      // const user = await dataFetchSingleWhere<UserType>(userModel, { uid: realm.currentUser.id })
      // if (!user) {
      //   console.error('user missing', realm.currentUser.id)
      //   throw new Error('User not found')
      // }
      // console.log('refetchCurrentUser', user)
      await realm.currentUser.refreshCustomData()
      this.currentUser.customData = realm.currentUser.customData
      this.currentUser.teams = realm.currentUser.customData.teams
      this.currentUser.providerType = realm.currentUser.providerType
      this.cartSessionToken = realm.currentUser.customData.cartSessionToken
    },
    async setTeams(teams: string[]) {
      this.currentUser.teams = teams
    },
    async loadCart(sessionToken?: string): Promise<{ cart: CartType, cartVariants: ProductVariantType[] } | null> {
      // if sessionToken === undefined means we are loading the cart from the current user
      const res: { cart: CartType, variants?: ProductVariantType } | undefined =
        await callFunc('getCart2', {
          sessionToken: !sessionToken ? this.cartSessionToken : sessionToken
        });
      console.log('cart?', res);
      if (!res) {
        return null;
      }

      this.cart = res.cart
      this.cartVariants = res.variants || []

      if (this.cartSessionToken !== res.cart.sessionToken) {
        await this.setCartSession(res.cart.sessionToken);
      }

      return { cart: this.cart, cartVariants: this.cartVariants };
    },
    async loginEmail(email: string, pass: string) {
      this.loginError = ''
      this.loading = true
      try {
        const realm = getRealm()
        // const credentials = Realm.Credentials.function({ username: email, password: pass })
        const credentials = Realm.Credentials.emailPassword(email, pass)
        const res = await realm.logIn(credentials)
        const currentUser = realm.currentUser;
        console.log('loggedin?', currentUser.customData.dob)
        this.currentUser = {
          id: res.id,
          uid: res.id,
          username: res.profile.name,
          avatar: res.profile.pictureUrl,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          teams: currentUser?.customData.teams,
          customData: currentUser?.customData,
          providerType: currentUser?.providerType
        }

        return this.currentUser
      }
      catch (err) {
        console.log('login failed', err)
      }
      finally {
        this.loading = true
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async sendVerifyEmail(_email: string) {
      // this.loading = true
      // try {
      // }
      // finally {
      //   this.loading = false
      // }
    },
  },
  persist: true
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAclStore, import.meta.hot))
