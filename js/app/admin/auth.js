import { util } from '../../common/util.js';
import { bs } from '../../libs/bootstrap.js';
import { dto } from '../../connection/dto.js';
import { storage } from '../../common/storage.js';
import { session } from '../../common/session.js';
// import { request, HTTP_GET, HTTP_STATUS_OK } from '../../connection/request.js';

export const auth = (() => {

    /**
     * @type {ReturnType<typeof storage>|null}
     */
    let user = null;

    /**
     * @param {HTMLButtonElement} button
     * @returns {Promise<void>}
     */
    const login = async (button) => {
        const btn = util.disableButton(button);

        const formEmail = document.getElementById('loginEmail');
        const formPassword = document.getElementById('loginPassword');

        // Automatically fill in the credentials
        formEmail.value = 'imamariadi775@gmail.com';
        formPassword.value = 'Persib1933';

        formEmail.disabled = true;
        formPassword.disabled = true;

        // Simulate successful login
        const res = { success: true };
        if (res.success) {
            formEmail.value = null;
            formPassword.value = null;
            bs.modal('mainModal').hide();

            // Set static user data
            user.set('email', 'imamariadi775@gmail.com');
            user.set('name', 'Imam Ariadi');
        }

        btn.restore();
        formEmail.disabled = false;
        formPassword.disabled = false;
    };

    /**
     * @returns {void}
     */
    const clearSession = () => {
        user.clear();
        session.logout();
        bs.modal('mainModal').show();
    };

    /**
     * @returns {Promise<ReturnType<typeof dto.baseResponse>>}
     */
    const getDetailUser = () => {
        // Return static user data
        return new Promise((resolve) => {
            const res = {
                code: 200,
                data: {
                    email: 'imamariadi775@gmail.com',
                    name: 'Imam Ariadi'
                }
            };
            Object.entries(res.data).forEach(([k, v]) => user.set(k, v));
            resolve(res);
        });
    };

    /**
     * @returns {ReturnType<typeof storage>|null}
     */
    const getUserStorage = () => user;

    /**
     * @returns {void}
     */
    const init = () => {
        user = storage('user');
    };

    return {
        init,
        login,
        clearSession,
        getDetailUser,
        getUserStorage,
    };
})();