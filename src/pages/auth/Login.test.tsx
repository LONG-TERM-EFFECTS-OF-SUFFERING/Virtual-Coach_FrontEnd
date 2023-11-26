import { test, expect, beforeEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { store } from '../../store/store';
import Login from './Login';

const component = (
    <Provider store={store}>
        <Router>
            <Login />
        </Router>
    </Provider>
)

beforeEach(() => {
    vi.resetAllMocks();
    cleanup()
})

test('Login renders correctly', async () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
})

test('Error message is shown when user_login fails', async () => {
    const data = { message: 'Error'}
    vi.spyOn(axios, 'post').mockImplementationOnce(() => {throw {response: {data}}})

    render(component)
    const login_button = screen.getByText('Login')
    fireEvent.click(login_button)

    const alert = await screen.findByText(data.message)
    expect(alert).toBeDefined()
})

test('Error message is not shown when user_login succeeds', async () => {
    const data = { message: 'Success'}
    vi.spyOn(axios, 'post').mockImplementationOnce(() => {
        return Promise.resolve({data})
    })

    render(component)
    const login_button = screen.getByText('Login')
    fireEvent.click(login_button)

    const alert = await screen.queryByText(data.message)
    expect(alert).toBeNull()
})