/*
 * Travel Request System
 *
 * This script drives a simple client‑side application that allows
 * employees to submit travel requests for flights and hotels. It uses
 * localStorage to store users and requests. The system supports
 * different roles (applicant, manager, admin). Managers can approve
 * or deny requests, and admins can manage user roles and mark
 * bookings as completed. A default admin account with username
 * "admin" and password "admin" is created on first load.
 */

(function () {
  /**
   * Translations for UI labels in English (en), Simplified Chinese (zh), French (fr) and Spanish (es).
   * Keys map to phrases used throughout the app. This allows switching UI language dynamically.
   */
  const translations = {
    en: {
      submitRequest: 'Submit Request',
      myRequests: 'My Requests',
      approvals: 'Approvals',
      manageUsers: 'Manage Users',
      bookings: 'Bookings',
      logout: 'Logout',
      newTravelRequest: 'New Travel Request',
      chooseBooking: 'Please choose what you need to book.',
      destination: 'Destination',
      destCity: 'Destination city:',
      requestType: 'Request type:',
      flightDetails: 'Flight details',
      departureCity: 'Departure city:',
      arrivalCity: 'Arrival city:',
      departureDate: 'Departure date:',
      returnDate: 'Return date:',
      flightTimePref: 'Flight time preference:',
      hotelDetails: 'Hotel details',
      hotelName: 'Hotel name (optional):',
      hotelCity: 'Hotel city:',
      hotelCheckin: 'Check‑in date:',
      hotelCheckout: 'Check‑out date:',
      hotelPref: 'Room preference:',
      select: 'Select...',
      invalidFlightDates: 'Departure and return dates must be after today, and return date must be after departure date.',
      invalidHotelDates: 'Check-in and check-out dates must be after today, and check-out date must be after check-in date.',
      personalDetails: 'Personal details',
      firstName: 'First name:',
      lastName: 'Last name:',
      birthday: 'Birthday:',
      cellphone: 'Cellphone number',
      confirmDetails: 'Confirm details are correct',
      submit: 'Submit',
      type: 'Type',
      month: 'Month',
      year: 'Year',
      employee: 'Employee',
      destinationCol: 'Destination',
      flightDates: 'Flight Dates',
      hotelDates: 'Hotel Dates',
      status: 'Status',
      itinerary: 'Itinerary',
      search: 'Search',
      approvedBy: 'Approved by',
      approve: 'Approve',
      deny: 'Deny',
      markBooked: 'Mark as Booked',
      findFlights: 'Find Flights',
      findHotel: 'Find Hotel',
      addUser: 'Add User',
      email: 'Email:',
      birthdayLabel: 'Birthday:',
      role: 'Role:',
      phone: 'Phone:',
      remove: 'Delete',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      confirmed: 'Confirmed',
      manageUsersHeading: 'Manage Users',
      addNewUser: 'Add New User',
      firstNameCol: 'First Name',
      lastNameCol: 'Last Name',
      birthdayCol: 'Birthday',
      roleCol: 'Role',
      phoneCol: 'Phone',
      actions: 'Actions'
      , noUsers: 'No users found.',
      flightOnly: 'Flight only',
      hotelOnly: 'Hotel only',
      flightHotel: 'Flight & Hotel',
      all: 'All'
      , statusPending: 'Pending'
      , statusApproved: 'Approved'
      , statusDenied: 'Denied'
      , statusBooked: 'Booked'
      , noRequests: 'No requests found.'
      , contactAdminHint: 'If you need to make changes, please contact the administrator.'
      , bookedQ: 'Booked?'
      , yes: 'Yes'
      , no: 'No'
      , download: 'Download'
      , flightPrefPlaceholder: 'e.g. morning flight, red‑eye flight'
      , destPlaceholder: 'e.g. Vancouver, BC'
      , flightFromPlaceholder: 'e.g. Vancouver'
      , arrivalPlaceholder: 'e.g. Toronto'
      , hotelNamePlaceholder: 'Hotel you prefer'
      , hotelCityPlaceholder: 'Hotel city'
      , hotelPrefPlaceholder: 'e.g. non‑smoking, king bed, includes breakfast'
      , newUserEmailPlaceholder: 'e.g. user@company.com'
    },
    zh: {
      submitRequest: '提交申请',
      myRequests: '我的申请',
      approvals: '审批',
      manageUsers: '管理用户',
      bookings: '预订',
      logout: '登出',
      newTravelRequest: '新的差旅申请',
      chooseBooking: '请选择需要预订的内容。',
      destination: '目的地',
      destCity: '目的地城市：',
      requestType: '申请类型：',
      flightDetails: '机票详情',
      departureCity: '出发城市：',
      arrivalCity: '到达城市：',
      departureDate: '出发日期：',
      returnDate: '返程日期：',
      flightTimePref: '航班时间偏好：',
      hotelDetails: '酒店详情',
      hotelName: '酒店名称（可选）：',
      hotelCity: '酒店城市：',
      hotelCheckin: '入住日期：',
      hotelCheckout: '退房日期：',
      hotelPref: '房间偏好：',
      select: '请选择',
      invalidFlightDates: '出发和返程日期必须在今天之后，并且返程日期必须晚于出发日期。',
      invalidHotelDates: '入住和退房日期必须在今天之后，并且退房日期必须晚于入住日期。',
      personalDetails: '个人信息',
      firstName: '名：',
      lastName: '姓：',
      birthday: '生日：',
      cellphone: '手机号码',
      confirmDetails: '确认信息正确',
      submit: '提交',
      type: '类型',
      month: '月份',
      year: '年份',
      employee: '员工',
      destinationCol: '目的地',
      flightDates: '飞行日期',
      hotelDates: '酒店日期',
      status: '状态',
      itinerary: '行程单',
      search: '搜索',
      approvedBy: '批准人',
      approve: '批准',
      deny: '拒绝',
      markBooked: '标记已预订',
      findFlights: '查询航班',
      findHotel: '查询酒店',
      addUser: '添加用户',
      email: '电子邮件：',
      birthdayLabel: '生日：',
      role: '角色：',
      phone: '电话：',
      remove: '删除',
      edit: '编辑',
      save: '保存',
      cancel: '取消',
      confirmed: '已确认',
      manageUsersHeading: '管理用户',
      addNewUser: '添加新用户',
      firstNameCol: '名',
      lastNameCol: '姓',
      birthdayCol: '生日',
      roleCol: '角色',
      phoneCol: '电话',
      actions: '操作'
      , noUsers: '没有用户。',
      flightOnly: '仅机票',
      hotelOnly: '仅酒店',
      flightHotel: '机票+酒店',
      all: '全部'
      , statusPending: '待审批'
      , statusApproved: '已批准'
      , statusDenied: '已拒绝'
      , statusBooked: '已预订'
      , noRequests: '没有找到申请。'
      , contactAdminHint: '如果需要更改，请联系管理员。'
      , bookedQ: '已预订？'
      , yes: '是'
      , no: '否'
      , download: '下载'
      , flightPrefPlaceholder: '例如：早班机或夜间航班'
      , destPlaceholder: '例如：温哥华，BC'
      , flightFromPlaceholder: '例如：温哥华'
      , arrivalPlaceholder: '例如：多伦多'
      , hotelNamePlaceholder: '您偏好的酒店'
      , hotelCityPlaceholder: '酒店所在城市'
      , hotelPrefPlaceholder: '例如：无烟、特大床、含早餐'
      , newUserEmailPlaceholder: '例如：user@company.com'
    },
    fr: {
      submitRequest: 'Soumettre une demande',
      myRequests: 'Mes demandes',
      approvals: 'Approbations',
      manageUsers: 'Gérer les utilisateurs',
      bookings: 'Réservations',
      logout: 'Se déconnecter',
      newTravelRequest: 'Nouvelle demande de voyage',
      chooseBooking: 'Veuillez choisir ce que vous devez réserver.',
      destination: 'Destination',
      destCity: 'Ville de destination :',
      requestType: 'Type de demande :',
      flightDetails: 'Détails du vol',
      departureCity: 'Ville de départ :',
      arrivalCity: 'Ville d\'arrivée :',
      departureDate: 'Date de départ :',
      returnDate: 'Date de retour :',
      flightTimePref: 'Préférence horaire du vol :',
      hotelDetails: 'Détails de l’hôtel',
      hotelName: 'Nom de l’hôtel (facultatif) :',
      hotelCity: 'Ville de l’hôtel :',
      hotelCheckin: 'Date d’arrivée :',
      hotelCheckout: 'Date de départ :',
      hotelPref: 'Préférence de chambre :',
      select: 'Sélectionner...',
      invalidFlightDates: 'Les dates de départ et de retour doivent être postérieures à aujourd\'hui, et la date de retour doit être postérieure à la date de départ.',
      invalidHotelDates: 'Les dates d\'arrivée et de départ doivent être postérieures à aujourd\'hui et la date de départ doit être postérieure à la date d\'arrivée.',
      personalDetails: 'Détails personnels',
      firstName: 'Prénom :',
      lastName: 'Nom :',
      birthday: 'Date de naissance :',
      cellphone: 'Numéro de portable',
      confirmDetails: 'Confirmer que les informations sont correctes',
      submit: 'Soumettre',
      type: 'Type',
      month: 'Mois',
      year: 'Année',
      employee: 'Employé',
      destinationCol: 'Destination',
      flightDates: 'Dates de vol',
      hotelDates: 'Dates d’hôtel',
      status: 'Statut',
      itinerary: 'Itinéraire',
      search: 'Recherche',
      approvedBy: 'Approuvé par',
      approve: 'Approuver',
      deny: 'Refuser',
      markBooked: 'Marquer comme réservé',
      findFlights: 'Chercher des vols',
      findHotel: 'Chercher un hôtel',
      addUser: 'Ajouter un utilisateur',
      email: 'Courriel :',
      birthdayLabel: 'Date de naissance :',
      role: 'Rôle :',
      phone: 'Téléphone :',
      remove: 'Supprimer',
      edit: 'Éditer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      confirmed: 'Confirmé',
      manageUsersHeading: 'Gérer les utilisateurs',
      addNewUser: 'Ajouter un nouvel utilisateur',
      firstNameCol: 'Prénom',
      lastNameCol: 'Nom',
      birthdayCol: 'Date de naissance',
      roleCol: 'Rôle',
      phoneCol: 'Téléphone',
      actions: 'Actions'
      , noUsers: 'Aucun utilisateur trouvé.',
      flightOnly: 'Vol seulement',
      hotelOnly: 'Hôtel seulement',
      flightHotel: 'Vol et hôtel',
      all: 'Tous'
      , statusPending: 'En attente'
      , statusApproved: 'Approuvé'
      , statusDenied: 'Refusé'
      , statusBooked: 'Réservé'
      , noRequests: 'Aucune demande trouvée.'
      , contactAdminHint: 'Pour toute modification, veuillez contacter l’administrateur.'
      , bookedQ: 'Réservé ?'
      , yes: 'Oui'
      , no: 'Non'
      , download: 'Télécharger'
      , flightPrefPlaceholder: 'p. ex. vol du matin, vol de nuit'
      , destPlaceholder: 'p. ex. Vancouver, C.-B.'
      , flightFromPlaceholder: 'p. ex. Vancouver'
      , arrivalPlaceholder: 'p. ex. Toronto'
      , hotelNamePlaceholder: "Hôtel préféré"
      , hotelCityPlaceholder: "Ville de l'hôtel"
      , hotelPrefPlaceholder: 'p. ex. non‑fumeur, lit king, petit déjeuner inclus'
      , newUserEmailPlaceholder: 'p. ex. user@company.com'
    },
    es: {
      submitRequest: 'Enviar solicitud',
      myRequests: 'Mis solicitudes',
      approvals: 'Aprobaciones',
      manageUsers: 'Gestionar usuarios',
      bookings: 'Reservas',
      logout: 'Cerrar sesión',
      newTravelRequest: 'Nueva solicitud de viaje',
      chooseBooking: 'Por favor elija lo que necesita reservar.',
      destination: 'Destino',
      destCity: 'Ciudad de destino:',
      requestType: 'Tipo de solicitud:',
      flightDetails: 'Detalles del vuelo',
      departureCity: 'Ciudad de salida:',
      arrivalCity: 'Ciudad de llegada:',
      departureDate: 'Fecha de salida:',
      returnDate: 'Fecha de regreso:',
      flightTimePref: 'Preferencia de horario de vuelo:',
      hotelDetails: 'Detalles del hotel',
      hotelName: 'Nombre del hotel (opcional):',
      hotelCity: 'Ciudad del hotel:',
      hotelCheckin: 'Fecha de entrada:',
      hotelCheckout: 'Fecha de salida:',
      hotelPref: 'Preferencia de habitación:',
      select: 'Seleccionar...',
      invalidFlightDates: 'Las fechas de salida y regreso deben ser posteriores a hoy, y la fecha de regreso debe ser posterior a la fecha de salida.',
      invalidHotelDates: 'Las fechas de entrada y salida deben ser posteriores a hoy, y la fecha de salida debe ser posterior a la fecha de entrada.',
      personalDetails: 'Datos personales',
      firstName: 'Nombre:',
      lastName: 'Apellido:',
      birthday: 'Cumpleaños:',
      cellphone: 'Número de celular',
      confirmDetails: 'Confirmar que la información es correcta',
      submit: 'Enviar',
      type: 'Tipo',
      month: 'Mes',
      year: 'Año',
      employee: 'Empleado',
      destinationCol: 'Destino',
      flightDates: 'Fechas de vuelo',
      hotelDates: 'Fechas de hotel',
      status: 'Estado',
      itinerary: 'Itinerario',
      search: 'Buscar',
      approvedBy: 'Aprobado por',
      approve: 'Aprobar',
      deny: 'Denegar',
      markBooked: 'Marcar como reservado',
      findFlights: 'Buscar vuelos',
      findHotel: 'Buscar hotel',
      addUser: 'Agregar usuario',
      email: 'Correo electrónico:',
      birthdayLabel: 'Cumpleaños:',
      role: 'Rol:',
      phone: 'Teléfono:',
      remove: 'Eliminar',
      edit: 'Editar',
      save: 'Guardar',
      cancel: 'Cancelar',
      confirmed: 'Confirmado',
      manageUsersHeading: 'Gestionar usuarios',
      addNewUser: 'Agregar nuevo usuario',
      firstNameCol: 'Nombre',
      lastNameCol: 'Apellido',
      birthdayCol: 'Cumpleaños',
      roleCol: 'Rol',
      phoneCol: 'Teléfono',
      actions: 'Acciones'
      , noUsers: 'No se encontraron usuarios.',
      flightOnly: 'Solo vuelo',
      hotelOnly: 'Solo hotel',
      flightHotel: 'Vuelo y hotel',
      all: 'Todos'
      , statusPending: 'Pendiente'
      , statusApproved: 'Aprobado'
      , statusDenied: 'Denegado'
      , statusBooked: 'Reservado'
      , noRequests: 'No se encontraron solicitudes.'
      , contactAdminHint: 'Si necesita realizar cambios, póngase en contacto con el administrador.'
      , bookedQ: '¿Reservado?'
      , yes: 'Sí'
      , no: 'No'
      , download: 'Descargar'
      , flightPrefPlaceholder: 'p. ej., vuelo matutino, vuelo nocturno'
      , destPlaceholder: 'p. ej., Vancouver, BC'
      , flightFromPlaceholder: 'p. ej., Vancouver'
      , arrivalPlaceholder: 'p. ej., Toronto'
      , hotelNamePlaceholder: 'Hotel de preferencia'
      , hotelCityPlaceholder: 'Ciudad del hotel'
      , hotelPrefPlaceholder: 'p. ej., no fumar, cama king, incluye desayuno'
      , newUserEmailPlaceholder: 'p. ej., user@company.com'
    }
  };

  /**
   * Current UI language. Default to English. Persisted in localStorage under 'travelLang'.
   */
  let lang = localStorage.getItem('travelLang') || 'en';

  /**
   * Translation helper: returns the translated string for a key in the current language.
   * Falls back to English if translation missing.
   */
  function t(key) {
    const dict = translations[lang] || translations['en'];
    return dict[key] || translations['en'][key] || key;
  }
  /** Utility: load users from localStorage or initialise default list. */
  function loadUsers() {
    try {
      const data = localStorage.getItem('travelUsers');
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error loading users:', err);
      return [];
    }
  }

  /** Utility: save user list to localStorage. */
  function saveUsers(users) {
    localStorage.setItem('travelUsers', JSON.stringify(users));
  }

  /** Utility: load requests from localStorage. */
  function loadRequests() {
    try {
      const data = localStorage.getItem('travelRequests');
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error loading requests:', err);
      return [];
    }
  }

  /** Utility: save requests list to localStorage. */
  function saveRequests(reqs) {
    localStorage.setItem('travelRequests', JSON.stringify(reqs));
  }

  /** Ensure the default admin user exists. */
  function ensureDefaultAdmin() {
    const users = loadUsers();
    const adminExists = users.some((u) => u.email === 'admin');
    if (!adminExists) {
      users.push({
        id: Date.now(),
        email: 'admin',
        password: 'admin',
        firstName: 'System',
        lastName: 'Administrator',
        phone: '',
        birthday: '',
        role: 'admin',
      });
      saveUsers(users);
    }
  }

  /** Global state for the current logged in user. */
  let currentUser = null;

  /** DOM helpers */
  const loginSection = document.getElementById('login-section');
  const appSection = document.getElementById('app-section');
  const userInfoEl = document.getElementById('user-info');
  const navBar = document.getElementById('nav-bar');
  const pageContent = document.getElementById('page-content');

  /** Initialise application on page load. */
  function init() {
    ensureDefaultAdmin();
    // Attach login event
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    // Attach Google login simulation
    const googleBtn = document.getElementById('google-login-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', handleGoogleLogin);
    }
    // Logout button
    document.getElementById('logout-button').addEventListener('click', () => {
      currentUser = null;
      renderInitialView();
    });
    // Language selector setup
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = lang;
      langSelect.addEventListener('change', () => {
        lang = langSelect.value;
        localStorage.setItem('travelLang', lang);
        // Re-render current view if logged in
        if (currentUser) {
          renderAppView();
        } else {
          renderInitialView();
        }
      });
    }
    // Render login view initially
    renderInitialView();
  }

  /** Render login and hide app/registration. */
  function renderInitialView() {
    loginSection.classList.remove('hidden');
    appSection.classList.add('hidden');
    // Reset login form fields
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
  }

  /** Show the registration form. */

  /** Handle user login. */
  function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;
    const users = loadUsers();
    // Admin login uses username 'admin'
    if (email === 'admin') {
      const admin = users.find((u) => u.email === 'admin');
      if (admin && password === admin.password) {
        currentUser = admin;
        renderAppView();
      } else {
        alert('Invalid admin credentials');
      }
      return;
    }
    // Non‑admin logins are handled via Google login simulation
    alert('Use the Google Login button for employee access.');
  }

  /** Simulated Google ID login. */
  function handleGoogleLogin() {
    let email = prompt('Please enter your company email address:');
    if (!email) return;
    email = email.trim().toLowerCase();
    // Basic sanity check for an email format – ensure it contains an '@'
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    // No longer restrict to Gmail; rely on admin‑added list for validation
    signInWithEmail(email);
  }

  /** Sign in or create user by email (for Google login). */
  function signInWithEmail(email) {
    const users = loadUsers();
    const user = users.find((u) => u.email === email);
    // If user does not already exist, deny login and instruct admin to add them
    if (!user) {
      alert('Your email is not registered in the system. Please contact an administrator to add your email before logging in.');
      return;
    }
    currentUser = user;
    renderAppView();
  }


  /** Render the application view for the current user. */
  function renderAppView() {
    loginSection.classList.add('hidden');
    // There is no separate registration section anymore
    appSection.classList.remove('hidden');
    // Display current user information
    userInfoEl.textContent = `${currentUser.firstName || ''} ${currentUser.lastName || ''} (${currentUser.email}) - ${capitalize(currentUser.role)}`;
    // Update logout button label based on current language
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
      logoutBtn.textContent = t('logout');
    }
    // Build navigation
    buildNavigation();
    // Show default page
    showSubmitRequest();
  }

  /** Capitalize the first letter of a string. */
  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  /** Build the navigation bar based on the current user's role. */
  function buildNavigation() {
    navBar.innerHTML = '';
    const navItems = [];
    navItems.push({ id: 'nav-submit', label: t('submitRequest'), handler: showSubmitRequest });
    navItems.push({ id: 'nav-mine', label: t('myRequests'), handler: showMyRequests });
    if (currentUser.role === 'manager' || currentUser.role === 'admin') {
      navItems.push({ id: 'nav-approvals', label: t('approvals'), handler: showApprovals });
    }
    if (currentUser.role === 'admin') {
      navItems.push({ id: 'nav-users', label: t('manageUsers'), handler: showUsers });
      navItems.push({ id: 'nav-bookings', label: t('bookings'), handler: showBookings });
    }
    navItems.forEach((item) => {
      const btn = document.createElement('button');
      btn.id = item.id;
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        // Remove active class from all nav buttons
        Array.from(navBar.children).forEach((child) => child.classList.remove('active'));
        btn.classList.add('active');
        item.handler();
      });
      navBar.appendChild(btn);
    });
  }

  /** Page: Submit Request */
  function showSubmitRequest() {
    pageContent.innerHTML = '';
    // Build form
    const form = document.createElement('form');
    form.id = 'request-form';
    form.innerHTML = `
      <h2>${t('newTravelRequest')}</h2>
      <p class="description">${t('chooseBooking')}</p>
      <div class="form-row">
        <label for="request-type">${t('requestType')}</label>
        <select id="request-type" required>
          <option value="" selected disabled>${t('select')}</option>
          <option value="both">${t('flightHotel')}</option>
          <option value="flight">${t('flightOnly')}</option>
          <option value="hotel">${t('hotelOnly')}</option>
        </select>
      </div>
      <div id="request-details" class="hidden">
        <div class="section-title">${t('destination')}</div>
        <div class="form-row">
          <label for="dest-city">${t('destCity')}</label>
          <input type="text" id="dest-city" required placeholder="${t('destPlaceholder')}" />
        </div>
        <!-- Personal details block displayed immediately after destination -->
        <div id="personal-section" class="section-block">
          <div class="section-title"><span class="icon">👤</span>${t('personalDetails')}</div>
          <div class="row">
            <div class="form-row inline">
              <label for="first-read">${t('firstName')}</label>
              <input type="text" id="first-read" value="${currentUser.firstName || ''}" readonly />
            </div>
            <div class="form-row inline">
              <label for="last-read">${t('lastName')}</label>
              <input type="text" id="last-read" value="${currentUser.lastName || ''}" readonly />
            </div>
            <div class="form-row inline">
              <label for="bday-read">${t('birthday')}</label>
              <input type="date" id="bday-read" value="${currentUser.birthday || ''}" readonly />
            </div>
          </div>
          <div class="row">
            <div class="form-row">
              <label for="pers-phone"><span class="icon">📱</span>${t('cellphone')} <small class="footnote-inline">Used for booking and to receive SMS updates about flight or hotel changes.</small></label>
              <input type="tel" id="pers-phone" required value="${currentUser.phone || ''}" />
            </div>
          </div>
          <div class="button-row">
            <button type="button" id="confirm-details-btn">${t('confirmDetails')}</button>
          </div>
          <p class="footnote">${t('contactAdminHint')}</p>
        </div>
        <div id="flight-section" class="section-block">
          <div class="section-title"><span class="icon">✈️</span>${t('flightDetails')}</div>
          <div class="row">
            <div class="form-row">
              <label for="flight-from">${t('departureCity')}</label>
            <input type="text" id="flight-from" placeholder="${t('flightFromPlaceholder')}" required />
            </div>
            <div class="form-row">
              <label for="flight-to">${t('arrivalCity')}</label>
              <div class="input-edit">
                <input type="text" id="flight-to" placeholder="${t('arrivalPlaceholder')}" readonly />
                <span class="edit-icon" id="edit-flight-to" title="Edit">✏️</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-row">
              <label for="flight-depart"><span class="icon">📅</span>${t('departureDate')}</label>
              <input type="date" id="flight-depart" required />
            </div>
            <div class="form-row">
              <label for="flight-return"><span class="icon">📅</span>${t('returnDate')}</label>
              <input type="date" id="flight-return" />
            </div>
          </div>
          <div class="form-row">
            <div class="error-message" id="flight-date-error"></div>
          </div>
            <div class="form-row">
              <label for="flight-pref">${t('flightTimePref')}</label>
            <input type="text" id="flight-pref" placeholder="${t('flightPrefPlaceholder')}" />
          </div>
        </div>
        <div id="hotel-section" class="section-block">
          <div class="section-title"><span class="icon">🏨</span>${t('hotelDetails')}</div>
          <div class="form-row">
            <label for="hotel-name">${t('hotelName')}</label>
            <input type="text" id="hotel-name" placeholder="${t('hotelNamePlaceholder')}" />
          </div>
          <div class="form-row">
            <label for="hotel-city">${t('hotelCity')}</label>
            <div class="input-edit">
              <input type="text" id="hotel-city" placeholder="${t('hotelCityPlaceholder')}" readonly />
              <span class="edit-icon" id="edit-hotel-city" title="Edit">✏️</span>
            </div>
          </div>
          <div class="row">
            <div class="form-row">
              <label for="hotel-checkin"><span class="icon">📅</span>${t('hotelCheckin')}</label>
              <input type="date" id="hotel-checkin" />
            </div>
            <div class="form-row">
              <label for="hotel-checkout"><span class="icon">📅</span>${t('hotelCheckout')}</label>
              <input type="date" id="hotel-checkout" />
            </div>
          </div>
          <div class="form-row">
            <div class="error-message" id="hotel-date-error"></div>
          </div>
          <div class="form-row">
            <label for="hotel-pref">${t('hotelPref')}</label>
            <input type="text" id="hotel-pref" placeholder="${t('hotelPrefPlaceholder')}" />
          </div>
        </div>
        <div class="button-row">
          <button type="submit">${t('submit')}</button>
        </div>
      </div>
    `;
    pageContent.appendChild(form);
    // Show/hide sections based on request type
    const requestTypeEl = form.querySelector('#request-type');
    const flightSection = form.querySelector('#flight-section');
    const hotelSection = form.querySelector('#hotel-section');
    const detailsSection = form.querySelector('#request-details');
    function updateSections() {
      const val = requestTypeEl.value;
      if (!val) {
        detailsSection.classList.add('hidden');
        return;
      }
      detailsSection.classList.remove('hidden');
      if (val === 'flight') {
        flightSection.style.display = '';
        hotelSection.style.display = 'none';
      } else if (val === 'hotel') {
        flightSection.style.display = 'none';
        hotelSection.style.display = '';
      } else {
        flightSection.style.display = '';
        hotelSection.style.display = '';
      }
    }
    updateSections();
    requestTypeEl.addEventListener('change', updateSections);

    // Auto‑link destination city to arrival and hotel city fields. The arrival city
    // defaults to the destination city but can be manually edited by clicking
    // the pencil icon. If edited, it will no longer update with destination changes.
    const destInput = form.querySelector('#dest-city');
    const arrivalInput = form.querySelector('#flight-to');
    const editArrivalIcon = form.querySelector('#edit-flight-to');
    const hotelCityInput = form.querySelector('#hotel-city');
    const editHotelCityIcon = form.querySelector('#edit-hotel-city');
    if (destInput) {
      // Initialise arrival and hotel city values based on destination
      if (arrivalInput) arrivalInput.value = destInput.value;
      if (hotelCityInput) hotelCityInput.value = destInput.value;
      destInput.addEventListener('input', () => {
        // Update arrival city if not manually overridden
        if (arrivalInput && arrivalInput.dataset.manual !== 'true') {
          arrivalInput.value = destInput.value;
        }
        // Update hotel city if not manually overridden
        if (hotelCityInput && hotelCityInput.dataset.manual !== 'true') {
          hotelCityInput.value = destInput.value;
        }
      });
    }
    // Attach edit handlers to allow manual editing of arrival city
    if (editArrivalIcon && arrivalInput) {
      editArrivalIcon.addEventListener('click', () => {
        arrivalInput.readOnly = false;
        arrivalInput.focus();
        arrivalInput.dataset.manual = 'true';
      });
    }
    // Attach edit handlers for hotel city
    if (editHotelCityIcon && hotelCityInput) {
      editHotelCityIcon.addEventListener('click', () => {
        hotelCityInput.readOnly = false;
        hotelCityInput.focus();
        hotelCityInput.dataset.manual = 'true';
      });
    }
    // Validate dates on change
    const departEl = form.querySelector('#flight-depart');
    const returnEl = form.querySelector('#flight-return');
    const flightErrorEl = form.querySelector('#flight-date-error');
    const checkinEl = form.querySelector('#hotel-checkin');
    const checkoutEl = form.querySelector('#hotel-checkout');
    const hotelErrorEl = form.querySelector('#hotel-date-error');
    function validateFlightDates() {
      // Validate that departure and return dates are after today and return is after departure
      let valid = true;
      flightErrorEl.textContent = '';
      departEl.classList.remove('invalid');
      returnEl.classList.remove('invalid');
      const d1 = departEl.value;
      const d2 = returnEl.value;
      // Determine today string (YYYY-MM-DD)
      const todayStr = new Date().toISOString().split('T')[0];
      // Departure must be after today
      if (d1) {
        if (d1 <= todayStr) {
          valid = false;
          departEl.classList.add('invalid');
        }
      }
      // Return date must be after today as well
      if (d2) {
        if (d2 <= todayStr) {
          valid = false;
          returnEl.classList.add('invalid');
        }
      }
      // If both dates exist, ensure return > departure
      if (d1 && d2 && d1 > d2) {
        valid = false;
        departEl.classList.add('invalid');
        returnEl.classList.add('invalid');
      }
      if (!valid) {
        flightErrorEl.textContent = t('invalidFlightDates');
      }
      return valid;
    }
    function validateHotelDates() {
      let valid = true;
      hotelErrorEl.textContent = '';
      checkinEl.classList.remove('invalid');
      checkoutEl.classList.remove('invalid');
      const d1 = checkinEl.value;
      const d2 = checkoutEl.value;
      const todayStr = new Date().toISOString().split('T')[0];
      // Check-in must be after today
      if (d1) {
        if (d1 <= todayStr) {
          valid = false;
          checkinEl.classList.add('invalid');
        }
      }
      // Check-out must be after today
      if (d2) {
        if (d2 <= todayStr) {
          valid = false;
          checkoutEl.classList.add('invalid');
        }
      }
      // Ensure checkout after checkin
      if (d1 && d2 && d1 > d2) {
        valid = false;
        checkinEl.classList.add('invalid');
        checkoutEl.classList.add('invalid');
      }
      if (!valid) {
        hotelErrorEl.textContent = t('invalidHotelDates');
      }
      return valid;
    }
    departEl.addEventListener('change', validateFlightDates);
    returnEl.addEventListener('change', validateFlightDates);
    checkinEl.addEventListener('change', validateHotelDates);
    checkoutEl.addEventListener('change', validateHotelDates);

    // Track confirmation of personal details
    let detailsConfirmed = false;
    const confirmBtn = form.querySelector('#confirm-details-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        detailsConfirmed = true;
        confirmBtn.textContent = t('confirmed') || 'Confirmed';
        confirmBtn.disabled = true;
      });
    }
    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Ensure personal details confirmed
      if (!detailsConfirmed) {
        alert('Please confirm your personal details are correct by clicking the confirmation button.');
        return;
      }
      // Validate based on sections displayed
      if (requestTypeEl.value !== 'hotel' && !validateFlightDates()) {
        return;
      }
      if (requestTypeEl.value !== 'flight' && !validateHotelDates()) {
        return;
      }
      // Build request object
        const req = {
        id: Date.now(),
        userId: currentUser.id,
        type: requestTypeEl.value,
        destCity: form.querySelector('#dest-city').value.trim(),
        flightFrom: form.querySelector('#flight-from') ? form.querySelector('#flight-from').value.trim() : null,
        flightTo: form.querySelector('#flight-to') ? form.querySelector('#flight-to').value.trim() : null,
        flightDepart: departEl.value || null,
        flightReturn: returnEl.value || null,
        flightPref: form.querySelector('#flight-pref') ? form.querySelector('#flight-pref').value.trim() : '',
        hotelName: form.querySelector('#hotel-name') ? form.querySelector('#hotel-name').value.trim() : null,
          hotelCity: form.querySelector('#hotel-city') ? form.querySelector('#hotel-city').value.trim() : null,
        hotelCheckin: checkinEl.value || null,
        hotelCheckout: checkoutEl.value || null,
        hotelPref: form.querySelector('#hotel-pref') ? form.querySelector('#hotel-pref').value.trim() : '',
        // copy current user personal details into request
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: form.querySelector('#pers-phone').value.trim(),
        birthday: currentUser.birthday,
        email: currentUser.email,
        status: 'pending',
        managerId: null,
        adminBooked: false,
        itineraryFileName: null,
        itineraryFileData: null,
      };
      // Save request
      const requests = loadRequests();
      requests.push(req);
      saveRequests(requests);
      alert('Travel request submitted successfully.');
      showMyRequests();
    });
  }

  /** Page: My Requests */
  function showMyRequests() {
    pageContent.innerHTML = `<h2>${t('myRequests')}</h2>`;
    const allRequests = loadRequests().filter((r) => r.userId === currentUser.id);
    if (allRequests.length === 0) {
      const p = document.createElement('p');
      p.textContent = t('noRequests');
      pageContent.appendChild(p);
      return;
    }
    // Build filters
    const filterDiv = document.createElement('div');
    filterDiv.classList.add('filters');
    filterDiv.innerHTML = `
      <div class="row">
        <div class="form-row">
          <label for="myfilter-type">${t('type')}:</label>
          <select id="myfilter-type">
            <option value="">${t('all')}</option>
            <option value="flight">${t('flightOnly')}</option>
            <option value="hotel">${t('hotelOnly')}</option>
            <option value="both">${t('flightHotel')}</option>
          </select>
        </div>
        <div class="form-row">
          <label for="myfilter-month">${t('month')}:</label>
          <select id="myfilter-month">
            <option value="">${t('all')}</option>
            ${Array.from({ length: 12 }, (_, i) => `<option value="${(i + 1).toString().padStart(2, '0')}">${(i + 1).toString().padStart(2, '0')}</option>`).join('')}
          </select>
        </div>
        <div class="form-row">
          <label for="myfilter-year">${t('year')}:</label>
          <select id="myfilter-year"></select>
        </div>
      </div>
    `;
    pageContent.appendChild(filterDiv);
    // Populate year options
    const years = new Set();
    allRequests.forEach((req) => {
      const dateStr = getRequestPrimaryDate(req);
      if (dateStr) {
        years.add(dateStr.split('-')[0]);
      }
    });
    const yearSelect = filterDiv.querySelector('#myfilter-year');
    yearSelect.innerHTML = '<option value="">All</option>' + Array.from(years).sort().map((y) => `<option value="${y}">${y}</option>`).join('');
    // Create table container
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    [t('type'), t('destinationCol'), t('flightDates'), t('hotelDates'), t('status'), t('itinerary')].forEach((h) => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    pageContent.appendChild(table);
    // Render rows based on filters
    function renderRows(list) {
      // Remove existing rows except header
      while (table.rows.length > 1) table.deleteRow(1);
      list.forEach((req) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${capitalize(req.type)}</td>
          <td>${req.destCity}</td>
          <td class="nowrap">${req.type !== 'hotel' ? formatDateRange(req.flightDepart, req.flightReturn) : '—'}</td>
          <td class="nowrap">${req.type !== 'flight' ? formatDateRange(req.hotelCheckin, req.hotelCheckout) : '—'}</td>
          <td>${formatStatus(req.status, req.adminBooked)}</td>
          <td></td>
        `;
        const itinTd = row.lastElementChild;
        if (req.itineraryFileData) {
          const link = document.createElement('a');
          link.textContent = t('download') || 'Download';
          link.href = req.itineraryFileData;
          link.download = req.itineraryFileName || 'itinerary';
          itinTd.appendChild(link);
        } else {
          itinTd.textContent = '—';
        }
        table.appendChild(row);
      });
    }
    // Helper to apply filters
    function applyFilters() {
      const typeVal = filterDiv.querySelector('#myfilter-type').value;
      const monthVal = filterDiv.querySelector('#myfilter-month').value;
      const yearVal = filterDiv.querySelector('#myfilter-year').value;
      let filtered = allRequests;
      if (typeVal) {
        filtered = filtered.filter((r) => r.type === typeVal);
      }
      if (monthVal || yearVal) {
        filtered = filtered.filter((r) => {
          const dateStr = getRequestPrimaryDate(r);
          if (!dateStr) return false;
          const [y, m] = dateStr.split('-');
          if (yearVal && y !== yearVal) return false;
          if (monthVal && m !== monthVal) return false;
          return true;
        });
      }
      renderRows(filtered);
    }
    // Attach events
    filterDiv.querySelector('#myfilter-type').addEventListener('change', applyFilters);
    filterDiv.querySelector('#myfilter-month').addEventListener('change', applyFilters);
    filterDiv.querySelector('#myfilter-year').addEventListener('change', applyFilters);
    // Define helper to get request date
    function getRequestPrimaryDate(req) {
      // Choose flightDepart; else flightReturn; else hotelCheckin; else hotelCheckout
      const dateVal = req.flightDepart || req.flightReturn || req.hotelCheckin || req.hotelCheckout;
      return dateVal || null;
    }
    // Initial render with all
    applyFilters();
  }

  /** Format date range into a human‑readable string. */
  function formatDateRange(start, end) {
    return start && end ? `${start} – ${end}` : start || end || '';
  }

  /** Format status text. */
  function formatStatus(status, booked) {
    // Determine translated status based on approval and booking state
    if (status === 'approved') {
      return booked ? t('statusBooked') : t('statusApproved');
    }
    if (status === 'pending') {
      return t('statusPending');
    }
    if (status === 'denied') {
      return t('statusDenied');
    }
    // Fallback: capitalize string
    return capitalize(status);
  }

  /** Map our language codes to Google language parameter values. */
  function getGoogleLang() {
    switch (lang) {
      case 'zh':
        return 'zh-CN';
      case 'fr':
        return 'fr';
      case 'es':
        return 'es';
      default:
        return 'en';
    }
  }

  /** Build a deep link URL for Google Flights based on request details. */
  function buildFlightSearchURL(req) {
    // Only build if flight portion exists
    const from = (req.flightFrom || '').trim();
    const to = (req.flightTo || req.destCity || '').trim();
    const depart = req.flightDepart || '';
    // If there is no departure date, we cannot search
    if (!depart || !from || !to) return null;
    let qString = `flights from ${from} to ${to} on ${depart}`;
    if (req.flightReturn) {
      qString += ` return on ${req.flightReturn}`;
    }
    // Replace spaces with plus signs for the q parameter
    const qParam = qString.replace(/\s+/g, '+');
    const hl = getGoogleLang();
    const url = `https://www.google.com/travel/flights/search?q=${qParam}&stops=1&sort=PRICE&hl=${hl}&gl=CA`;
    return url;
  }

  /** Build a deep link URL for Google Hotels based on request details. */
  function buildHotelSearchURL(req) {
    // Only build if there is a hotel component
    const city = (req.hotelCity || req.destCity || '').trim();
    if (!city) return null;
    let baseQuery = '';
    // Prefer hotel name if provided
    if (req.hotelName && req.hotelName.trim()) {
      baseQuery = `${req.hotelName.trim()} ${city}`;
    } else {
      baseQuery = `${city} hotels`;
    }
    // Add dates if available
    if (req.hotelCheckin) {
      baseQuery += ` on ${req.hotelCheckin}`;
    }
    if (req.hotelCheckout) {
      // Use 'until' phrasing
      baseQuery += ` until ${req.hotelCheckout}`;
    }
    const qParam = baseQuery.replace(/\s+/g, '+');
    const hl = getGoogleLang();
    const url = `https://www.google.com/travel/hotels/search?q=${qParam}&sort=PRICE&hl=${hl}&gl=CA`;
    return url;
  }

  /** Page: Approvals (Manager & Admin) */
  function showApprovals() {
    pageContent.innerHTML = `<h2>${t('approvals')}</h2>`;
    const requests = loadRequests().filter((r) => r.status === 'pending');
    if (requests.length === 0) {
      const p = document.createElement('p');
      p.textContent = t('noRequests') || 'There are no pending requests.';
      pageContent.appendChild(p);
      return;
    }
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    [t('employee'), t('type'), t('destinationCol'), t('flightDates'), t('hotelDates'), t('actions')].forEach((h) => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    requests.forEach((req) => {
      const row = document.createElement('tr');
      const user = loadUsers().find((u) => u.id === req.userId) || {};
        row.innerHTML = `
        <td>${user.firstName || ''} ${user.lastName || ''} (${user.email})</td>
        <td>${capitalize(req.type)}</td>
        <td>${req.destCity}</td>
        <td class="nowrap">${req.type !== 'hotel' ? formatDateRange(req.flightDepart, req.flightReturn) : '—'}</td>
        <td class="nowrap">${req.type !== 'flight' ? formatDateRange(req.hotelCheckin, req.hotelCheckout) : '—'}</td>
        <td></td>
      `;
      const actionsTd = row.lastElementChild;
      const approveBtn = document.createElement('button');
      approveBtn.textContent = t('approve') || 'Approve';
      approveBtn.addEventListener('click', () => {
        updateRequestStatus(req.id, 'approved', currentUser.id);
        showApprovals();
      });
      const denyBtn = document.createElement('button');
      denyBtn.textContent = t('deny') || 'Deny';
      denyBtn.classList.add('secondary');
      denyBtn.addEventListener('click', () => {
        updateRequestStatus(req.id, 'denied', currentUser.id);
        showApprovals();
      });
      actionsTd.appendChild(approveBtn);
      actionsTd.appendChild(denyBtn);
      table.appendChild(row);
    });
    pageContent.appendChild(table);
  }

  /** Update request status and manager ID. */
  function updateRequestStatus(reqId, newStatus, managerId) {
    const requests = loadRequests();
    const idx = requests.findIndex((r) => r.id === reqId);
    if (idx !== -1) {
      requests[idx].status = newStatus;
      requests[idx].managerId = managerId;
      saveRequests(requests);
    }
  }

  /** Page: Manage Users (Admin only) */
  function showUsers() {
    pageContent.innerHTML = `<h2>${t('manageUsers')}</h2>`;
    // Add user form with birthday
    const addContainer = document.createElement('div');
    addContainer.classList.add('section-block');
    addContainer.innerHTML = `
      <h3>${t('addNewUser')}</h3>
      <div class="row">
        <div class="form-row">
          <label for="new-user-email">${t('email')}</label>
          <input type="email" id="new-user-email" placeholder="${t('newUserEmailPlaceholder')}" required />
        </div>
        <div class="form-row">
          <label for="new-user-first">${t('firstName')}</label>
          <input type="text" id="new-user-first" required />
        </div>
        <div class="form-row">
          <label for="new-user-last">${t('lastName')}</label>
          <input type="text" id="new-user-last" required />
        </div>
        <div class="form-row">
          <label for="new-user-bday">${t('birthdayLabel')}</label>
          <input type="date" id="new-user-bday" required />
        </div>
        <div class="form-row">
          <label for="new-user-role">${t('role')}</label>
          <select id="new-user-role">
            <option value="applicant">${capitalize('applicant')}</option>
            <option value="manager">${capitalize('manager')}</option>
            <option value="admin">${capitalize('admin')}</option>
          </select>
        </div>
      </div>
      <div class="button-row">
        <button type="button" id="add-user-btn">${t('addUser')}</button>
      </div>
    `;
    pageContent.appendChild(addContainer);
    // Handle add user
    addContainer.querySelector('#add-user-btn').addEventListener('click', () => {
      const emailInput = addContainer.querySelector('#new-user-email');
      const firstInput = addContainer.querySelector('#new-user-first');
      const lastInput = addContainer.querySelector('#new-user-last');
      const bdayInput = addContainer.querySelector('#new-user-bday');
      const roleSelect = addContainer.querySelector('#new-user-role');
      const email = emailInput.value.trim().toLowerCase();
      const first = firstInput.value.trim();
      const last = lastInput.value.trim();
      const bday = bdayInput.value;
      const role = roleSelect.value;
      if (!email || !first || !last || !bday) {
        alert('Please complete all required fields.');
        return;
      }
      const usersList = loadUsers();
      if (usersList.some((u) => u.email === email)) {
        alert('A user with this email already exists.');
        return;
      }
      const newUser = {
        id: Date.now(),
        email,
        password: '',
        firstName: first,
        lastName: last,
        birthday: bday,
        phone: '',
        role,
      };
      usersList.push(newUser);
      saveUsers(usersList);
      // Reset form
      emailInput.value = '';
      firstInput.value = '';
      lastInput.value = '';
      bdayInput.value = '';
      roleSelect.value = 'applicant';
      showUsers();
    });
    // Display existing users sorted by first name
    const users = loadUsers().filter((u) => u.email !== 'admin');
    if (users.length === 0) {
      pageContent.innerHTML += `<p>${t('noUsers') || 'No users found.'}</p>`;
      return;
    }
    // Sort alphabetically by first name
    users.sort((a, b) => a.firstName.localeCompare(b.firstName));
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    [t('firstNameCol'), t('lastNameCol'), t('birthdayCol'), t('email').replace(':',''), t('phoneCol'), t('roleCol'), t('actions')].forEach((h) => {
      const th = document.createElement('th');
      th.textContent = h || '';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    users.forEach((user) => {
      const row = document.createElement('tr');
      // first name cell
      const firstTd = document.createElement('td');
      const firstSpan = document.createElement('span');
      firstSpan.textContent = user.firstName;
      const firstInputEdit = document.createElement('input');
      firstInputEdit.type = 'text';
      firstInputEdit.value = user.firstName;
      firstInputEdit.classList.add('hidden');
      firstTd.appendChild(firstSpan);
      firstTd.appendChild(firstInputEdit);
      row.appendChild(firstTd);
      // last name cell
      const lastTd = document.createElement('td');
      const lastSpan = document.createElement('span');
      lastSpan.textContent = user.lastName;
      const lastInputEdit = document.createElement('input');
      lastInputEdit.type = 'text';
      lastInputEdit.value = user.lastName;
      lastInputEdit.classList.add('hidden');
      lastTd.appendChild(lastSpan);
      lastTd.appendChild(lastInputEdit);
      row.appendChild(lastTd);
      // birthday cell
      const bdayTd = document.createElement('td');
      const bdaySpan = document.createElement('span');
      bdaySpan.textContent = user.birthday || '';
      const bdayInput = document.createElement('input');
      bdayInput.type = 'date';
      bdayInput.value = user.birthday || '';
      bdayInput.classList.add('hidden');
      bdayTd.appendChild(bdaySpan);
      bdayTd.appendChild(bdayInput);
      row.appendChild(bdayTd);
      // email cell (not editable)
      const emailTd = document.createElement('td');
      emailTd.textContent = user.email;
      row.appendChild(emailTd);
      // phone cell
      const phoneTd = document.createElement('td');
      const phoneSpan = document.createElement('span');
      phoneSpan.textContent = user.phone || '';
      const phoneInput = document.createElement('input');
      phoneInput.type = 'text';
      phoneInput.value = user.phone || '';
      phoneInput.classList.add('hidden');
      phoneTd.appendChild(phoneSpan);
      phoneTd.appendChild(phoneInput);
      row.appendChild(phoneTd);
      // role cell
      const roleTd = document.createElement('td');
      const roleSpan = document.createElement('span');
      roleSpan.textContent = capitalize(user.role);
      const roleSelectEdit = document.createElement('select');
      ['applicant','manager','admin'].forEach((ro) => {
        const opt = document.createElement('option');
        opt.value = ro;
        opt.textContent = capitalize(ro);
        if (user.role === ro) opt.selected = true;
        roleSelectEdit.appendChild(opt);
      });
      roleSelectEdit.classList.add('hidden');
      roleTd.appendChild(roleSpan);
      roleTd.appendChild(roleSelectEdit);
      row.appendChild(roleTd);
      // actions cell
      const actTd = document.createElement('td');
      // edit button (pencil icon)
      const editBtn = document.createElement('button');
      editBtn.innerHTML = '✏️';
      editBtn.classList.add('secondary');
      // save button
      const saveBtn = document.createElement('button');
      saveBtn.textContent = t('save') || 'Save';
      saveBtn.classList.add('secondary');
      saveBtn.classList.add('hidden');
      // cancel button
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = t('cancel') || 'Cancel';
      cancelBtn.classList.add('secondary');
      cancelBtn.classList.add('hidden');
      // delete button (red cross icon)
      const delBtn = document.createElement('button');
      delBtn.innerHTML = '❌';
      delBtn.classList.add('secondary');
      delBtn.classList.add('delete-icon');
      // Append buttons
      actTd.appendChild(editBtn);
      actTd.appendChild(saveBtn);
      actTd.appendChild(cancelBtn);
      actTd.appendChild(delBtn);
      row.appendChild(actTd);
      // event handlers
      editBtn.addEventListener('click', () => {
        // show inputs and save/cancel, hide spans and edit
        firstSpan.classList.add('hidden');
        lastSpan.classList.add('hidden');
        bdaySpan.classList.add('hidden');
        phoneSpan.classList.add('hidden');
        roleSpan.classList.add('hidden');
        firstInputEdit.classList.remove('hidden');
        lastInputEdit.classList.remove('hidden');
        bdayInput.classList.remove('hidden');
        phoneInput.classList.remove('hidden');
        roleSelectEdit.classList.remove('hidden');
        editBtn.classList.add('hidden');
        delBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
      });
      saveBtn.addEventListener('click', () => {
        // Save changes
        const usersList = loadUsers();
        const idx = usersList.findIndex((u) => u.id === user.id);
        if (idx !== -1) {
          usersList[idx].firstName = firstInputEdit.value.trim();
          usersList[idx].lastName = lastInputEdit.value.trim();
          usersList[idx].birthday = bdayInput.value;
          usersList[idx].phone = phoneInput.value.trim();
          usersList[idx].role = roleSelectEdit.value;
          saveUsers(usersList);
          // update currentUser if editing self
          if (user.id === currentUser.id) {
            currentUser.firstName = usersList[idx].firstName;
            currentUser.lastName = usersList[idx].lastName;
            currentUser.birthday = usersList[idx].birthday;
            currentUser.phone = usersList[idx].phone;
            currentUser.role = usersList[idx].role;
            buildNavigation();
          }
        }
        showUsers();
      });
      cancelBtn.addEventListener('click', () => {
        showUsers();
      });
      delBtn.addEventListener('click', () => {
        if (confirm('Delete this user?')) {
          const usersList = loadUsers().filter((u) => u.id !== user.id);
          saveUsers(usersList);
          // Remove any requests by that user
          const requests = loadRequests().filter((r) => r.userId !== user.id);
          saveRequests(requests);
          showUsers();
        }
      });
      table.appendChild(row);
    });
    pageContent.appendChild(table);
  }

  /** Page: Bookings (Admin only) */
  function showBookings() {
    pageContent.innerHTML = `<h2>${t('bookings')}</h2>`;
    // Get all approved requests
    const allApproved = loadRequests().filter((r) => r.status === 'approved');
    if (allApproved.length === 0) {
      pageContent.innerHTML += `<p>${t('noRequests')}</p>`;
      return;
    }
    // Build filters
    const filterDiv = document.createElement('div');
    filterDiv.classList.add('filters');
    filterDiv.innerHTML = `
      <div class="row">
        <div class="form-row">
          <label for="bookfilter-type">${t('type')}:</label>
          <select id="bookfilter-type">
            <option value="">${t('all')}</option>
            <option value="flight">${t('flightOnly')}</option>
            <option value="hotel">${t('hotelOnly')}</option>
            <option value="both">${t('flightHotel')}</option>
          </select>
        </div>
        <div class="form-row">
          <label for="bookfilter-month">${t('month')}:</label>
          <select id="bookfilter-month">
            <option value="">${t('all')}</option>
            ${Array.from({ length: 12 }, (_, i) => `<option value="${(i + 1).toString().padStart(2, '0')}">${(i + 1).toString().padStart(2, '0')}</option>`).join('')}
          </select>
        </div>
        <div class="form-row">
          <label for="bookfilter-year">${t('year')}:</label>
          <select id="bookfilter-year"></select>
        </div>
      </div>
    `;
    pageContent.appendChild(filterDiv);
    // Populate year options
    const yearSet = new Set();
    allApproved.forEach((req) => {
      const dateStr = getRequestPrimaryDate(req);
      if (dateStr) {
        yearSet.add(dateStr.split('-')[0]);
      }
    });
    const yearSelect = filterDiv.querySelector('#bookfilter-year');
    yearSelect.innerHTML = '<option value="">All</option>' + Array.from(yearSet).sort().map((y) => `<option value="${y}">${y}</option>`).join('');
    // Create table and header
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    // Table headers: Employee, Type, Destination, Approved By, Flight Dates, Hotel Dates, Booked?, Itinerary, Search
    [t('employee'), t('type'), t('destinationCol'), t('approvedBy'), t('flightDates'), t('hotelDates'), t('bookedQ'), t('itinerary'), t('search')].forEach((h) => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    pageContent.appendChild(table);
    // Function to render table rows with bookings and upload logic
    function renderBookingRows(list) {
      // remove existing rows except header
      while (table.rows.length > 1) table.deleteRow(1);
      list.forEach((req) => {
        const row = document.createElement('tr');
        const user = loadUsers().find((u) => u.id === req.userId) || {};
        row.innerHTML = `
          <td>${user.firstName || ''} ${user.lastName || ''} (${user.email})</td>
          <td>${capitalize(req.type)}</td>
          <td>${req.destCity}</td>
          <td>${(() => {
            if (req.managerId) {
              const mgr = loadUsers().find((u) => u.id === req.managerId);
              return mgr ? mgr.firstName : '';
            }
            return '';
          })()}</td>
          <td class="nowrap">${req.type !== 'hotel' ? formatDateRange(req.flightDepart, req.flightReturn) : '—'}</td>
          <td class="nowrap">${req.type !== 'flight' ? formatDateRange(req.hotelCheckin, req.hotelCheckout) : '—'}</td>
          <td></td>
          <td></td>
          <td></td>
        `;
        const bookedTd = row.children[6];
        const itineraryTd = row.children[7];
        // Booked column
        if (req.adminBooked) {
          bookedTd.textContent = t('yes');
        } else {
          const btn = document.createElement('button');
          btn.textContent = t('markBooked');
          btn.addEventListener('click', () => {
            const requestsArr = loadRequests();
            const idx = requestsArr.findIndex((r) => r.id === req.id);
            if (idx !== -1) {
              requestsArr[idx].adminBooked = true;
              saveRequests(requestsArr);
              showBookings();
            }
          });
          bookedTd.appendChild(btn);
        }
        // Itinerary column (only relevant if booked)
        if (req.adminBooked) {
          if (req.itineraryFileData) {
            const download = document.createElement('a');
            download.textContent = t('download') || 'Download';
            download.href = req.itineraryFileData;
            download.download = req.itineraryFileName || 'itinerary';
            itineraryTd.appendChild(download);
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'application/pdf,image/*';
            fileInput.addEventListener('change', (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = function (ev) {
                const dataUrl = ev.target.result;
                const requestsArr = loadRequests();
                const idx = requestsArr.findIndex((r) => r.id === req.id);
                if (idx !== -1) {
                  requestsArr[idx].itineraryFileName = file.name;
                  requestsArr[idx].itineraryFileData = dataUrl;
                  saveRequests(requestsArr);
                  showBookings();
                }
              };
              reader.readAsDataURL(file);
            });
            itineraryTd.appendChild(document.createElement('br'));
            itineraryTd.appendChild(fileInput);
          } else {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'application/pdf,image/*';
            fileInput.addEventListener('change', (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = function (ev) {
                const dataUrl = ev.target.result;
                const requestsArr = loadRequests();
                const idx = requestsArr.findIndex((r) => r.id === req.id);
                if (idx !== -1) {
                  requestsArr[idx].itineraryFileName = file.name;
                  requestsArr[idx].itineraryFileData = dataUrl;
                  saveRequests(requestsArr);
                  showBookings();
                }
              };
              reader.readAsDataURL(file);
            });
            itineraryTd.appendChild(fileInput);
          }
        } else {
          itineraryTd.textContent = '—';
        }
        // Populate search actions column
        const searchTd = row.children[8];
        // Create flight search button
        const flightBtn = document.createElement('button');
        flightBtn.textContent = t('findFlights') || 'Find Flights';
        // Enable only if there is a flight component
        if (req.type === 'hotel') {
          flightBtn.disabled = true;
        }
        flightBtn.addEventListener('click', () => {
          const url = buildFlightSearchURL(req);
          if (url) {
            window.open(url, '_blank');
          }
        });
        searchTd.appendChild(flightBtn);
        // Create hotel search button
        const hotelBtn = document.createElement('button');
        hotelBtn.textContent = t('findHotel') || 'Find Hotel';
        // Only enable when type includes hotel
        if (req.type === 'flight') {
          hotelBtn.disabled = true;
        }
        hotelBtn.addEventListener('click', () => {
          const url = buildHotelSearchURL(req);
          if (url) {
            window.open(url, '_blank');
          }
        });
        searchTd.appendChild(hotelBtn);
        table.appendChild(row);
      });
    }
    // Helper to filter by type/month/year
    function applyBookingFilters() {
      const typeVal = filterDiv.querySelector('#bookfilter-type').value;
      const monthVal = filterDiv.querySelector('#bookfilter-month').value;
      const yearVal = filterDiv.querySelector('#bookfilter-year').value;
      let filtered = allApproved;
      if (typeVal) {
        filtered = filtered.filter((r) => r.type === typeVal);
      }
      if (monthVal || yearVal) {
        filtered = filtered.filter((r) => {
          const dateStr = getRequestPrimaryDate(r);
          if (!dateStr) return false;
          const [y, m] = dateStr.split('-');
          if (yearVal && y !== yearVal) return false;
          if (monthVal && m !== monthVal) return false;
          return true;
        });
      }
      // If no filters selected, hide requests with primary date more than one month from today
      const monthValFilter = monthVal;
      const yearValFilter = yearVal;
      let finalList = filtered;
      if (!typeVal && !monthValFilter && !yearValFilter) {
        const today = new Date();
        const oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        finalList = filtered.filter((r) => {
          const dateStr = getRequestPrimaryDate(r);
          if (!dateStr) return false;
          const dateObj = new Date(dateStr);
          return dateObj <= oneMonthLater;
        });
      }
      renderBookingRows(finalList);
    }
    // Attach events
    filterDiv.querySelector('#bookfilter-type').addEventListener('change', applyBookingFilters);
    filterDiv.querySelector('#bookfilter-month').addEventListener('change', applyBookingFilters);
    filterDiv.querySelector('#bookfilter-year').addEventListener('change', applyBookingFilters);
    // Helper to get primary date (same as my requests)
    function getRequestPrimaryDate(req) {
      const dateVal = req.flightDepart || req.flightReturn || req.hotelCheckin || req.hotelCheckout;
      return dateVal || null;
    }
    // Initial render
    applyBookingFilters();
  }

  // Initialise on DOM ready
  document.addEventListener('DOMContentLoaded', init);
})();