import { test, expect, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as auth_api from '../../actions/api/auth'
import Sign_up from './Sign_up';

const component = (
    <Sign_up />
)

const mock_user_create = (data: any, error: boolean) => {
    return Promise.resolve({
        data,
        error
    })
}

beforeEach(() => {
    vi.resetAllMocks();
    cleanup()
})

test('Sign_up renders correctly', async () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
})

test('Error message is shown when user_create fails', async () => {
    const data = { message: ['Error']}
    vi.spyOn(auth_api, 'user_create').mockImplementation(async () =>
        mock_user_create(data, true))

    render(component)
    const sign_up_button = screen.getByText('registrarse')
    fireEvent.click(sign_up_button)

    const alert = await screen.findByText(data.message[0])
    expect(alert).toBeDefined()
})

test('Success message is shown when user_create succeeds', async () => {
    const data = { message: ['User Created']}
    vi.spyOn(auth_api, 'user_create').mockImplementation(async () =>
        mock_user_create(data, false))

    render(component)
    const sign_up_button = screen.getByText('registrarse')
    fireEvent.click(sign_up_button)

    const alert = await screen.findByText(data.message[0])
    expect(alert).toBeDefined()
})