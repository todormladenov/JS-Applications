let _router = undefined;
let _authService = undefined;
let _userService = undefined;

export function init(router, authService, userService) {
    _router = router;
    _authService = authService;
    _userService = userService;
}

export async function logoutView() {
    await _userService.logout();
    _authService.removeUser();
    _router.redirect('/');
}