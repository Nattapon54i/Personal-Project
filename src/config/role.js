const components = {
  home: {
      component: 'Home',
      url: '/home'
  },
  signup: {
      component: 'Signup',
      url: '/signup'
  },
  showallproduct: {
      component: 'ShowAllProduct',
      url: '/showallproduct'
  },
  cartdetail: {
      component: 'CartDetail',
      url: '/product/:id'
  },
  shoppingcart: {
      component: 'ShoppingCart',
      url: '/shoppingcart'
  },
  profile: {
      component: 'Profile',
      url: '/profile'
  },
 
}

export default {
  admin: {
      routes: [...Object.values(components)],
      redirect: ['/home']
  },
  user: {
      routes: [
          components.home,
          components.signup,
          components.showallproduct,
          components.cartdetail,
          components.shoppingcart,
          components.profile,
      ],
      redirect: ['/home']
  },
  guest: {
      routes: [
          components.home,
          components.signup,
          components.showallproduct,
      ],
      redirect: ['/home']
  }
}