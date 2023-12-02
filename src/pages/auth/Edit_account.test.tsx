import { test, expect, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as auth_api from '../../actions/api/auth';
import EditAccount from './Edit_account';

const component = (
    <EditAccount />
)

beforeEach(() => {
    vi.resetAllMocks();
    cleanup()
})

test('EditAccount renders correctly', async () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
})

test('Error message is shown when users_put fails', async () => {
    vi.spyOn(auth_api, 'users_put').mockImplementationOnce(() => {
        return {
            error: true,
            data: {
                name: ["The name field is required."]
            }
        }
    })
    render(component)
    const changeNameButton = screen.getAllByText('Cambiar Nombre')
    fireEvent.click(changeNameButton[1])
    await screen.findByText(/The name field is required./i)
})

test('Success message is shown when users_put succeeds', async () => {
    vi.spyOn(auth_api, 'users_put').mockImplementationOnce(() => {
        return {
            error: false,
            data: {
                name: "New Name"
            }
        }
    })
    render(component)
    const changeNameButton = screen.getAllByText('Cambiar Nombre')
    fireEvent.click(changeNameButton[1])
    await screen.findByText(/Name Changed Successfully/i)
})

test('Error message is shown when set_email fails', async () => {
    vi.spyOn(auth_api, 'set_email').mockImplementationOnce(() => {
        return {
            error: true,
            data: {
                email: ["The email field is required."]
            }
        }
    })
    render(component)
    const changeEmailButton = screen.getAllByText('Cambiar Email')
    fireEvent.click(changeEmailButton[1])
    await screen.findByText(/The email field is required./i)
})

test('Success message is shown when set_email succeeds', async () => {
    vi.spyOn(auth_api, 'set_email').mockImplementationOnce(() => {
        return {
            error: false,
            data: {}
        }
    })
    render(component)
    const changeEmailButton = screen.getAllByText('Cambiar Email')
    fireEvent.click(changeEmailButton[1])
    await screen.findByText(/Email Changed Successfully/i)
})

test('Error message is shown when set_password fails', async () => {
    vi.spyOn(auth_api, 'set_password').mockImplementationOnce(() => {
        return {
            error: true,
            data: {
                password: ["The password field is required."]
            }
        }
    })
    render(component)
    const changePasswordButton = screen.getAllByText('Cambiar Contraseña')
    fireEvent.click(changePasswordButton[1])
    await screen.findByText(/The password field is required./i)
})

test('Success message is shown when set_password succeeds', async () => {
    vi.spyOn(auth_api, 'set_password').mockImplementationOnce(() => {
        return {
            error: false,
            data: {}
        }
    })
    render(component)
    const changePasswordButton = screen.getAllByText('Cambiar Contraseña')
    fireEvent.click(changePasswordButton[1])
    await screen.findByText(/Password Changed Successfully/i)
})