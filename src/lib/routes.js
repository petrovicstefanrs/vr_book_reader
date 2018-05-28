//**********************************************************************************************************************
// PUBLIC ROUTES
//**********************************************************************************************************************

export const HOME = '/';

export const AUTH_LOGIN = '/login';
export const AUTH_REGISTER = '/register';

//**********************************************************************************************************************
// PRIVATE ROUTES
//**********************************************************************************************************************

//**********************************************************************************************************************
// PRIVATE ROUTES | LIBRARY ROUTES
//**********************************************************************************************************************

export const DASHBOARD_LIBRARY = '/dashboard/library';
export const LIBRARY_EDIT = '/dashboard/library/edit/:bookId';
export const libraryEdit = bookId => '/dashboard/library/edit/' + bookId;
export const LIBRARY_READ = '/dashboard/library/read/:bookId';
export const libraryRead = bookId => '/dashboard/library/read/' + bookId;

export const DASHBOARD_HOME = '/dashboard/home';
export const DASHBOARD_FAVOURITES = '/dashboard/favourites';
export const DASHBOARD_SETTINGS = '/dashboard/settings';
export const DASHBOARD_STORE = '/dashboard/store';
export const DASHBOARD_EDITOR = '/dashboard/editor';

