module.exports = {

  // show the home page
  showHome: (req, res) => {

    var data = {
      page_title: "Home",
      page_code: "home",
    }

    console.log(req.session);
    //console.log('user ',req.session.user);
    res.render('pages/home', data);
  },
  showAbout: (req, res) => {
    var data = {
      page_title: "About US",
      page_code: "about",
    }
    res.render('pages/about', data);
  },
  showServices: (req, res) => {
    var data = {
      page_title: "Services",
      page_code: "services",
    }
    res.render('pages/services', data);
  },
  showCourses: (req, res) => {
    var data = {
      page_title: "Courses",
      page_code: "courses",
    }
    res.render('pages/courses', data);
  },
  showPricing: (req, res) => {
    var data = {
      page_title: "Pricing",
      page_code: "pricing",
    }
    res.render('pages/pricing', data);
  },
  showContact: (req, res) => {
    var data = {
      page_title: "Contact",
      page_code: "contact",
    }
    res.render('pages/contact', data);
  },
  showLogin: (req, res) => {
    var data = {
      page_title: "Login",
      page_code: "login",
    }
    res.render('pages/auth', data);
  }

};