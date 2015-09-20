Template.masterBreadcrumbs.helpers({
  'breadcrumb': function(){
    //var routeName = Router.current().route.name;
    //console.log(routeName)
    
    var crumbs = [
      {    path: '/dashboard',          text: 'Dashboard'    },
      {    path: '/admin',      text: 'Admin Console'    },
      {    path: '/admin/settings',      text: 'Settings'    }
    ];
    
    var data = {
      show: true,
      crumb: crumbs
    }
    return data;
  }
})