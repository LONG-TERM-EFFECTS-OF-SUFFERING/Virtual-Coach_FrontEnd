import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SuccessAlert from './SuccessAlert';

describe('SuccesAlert component', () => {

    const successMessage = 'This is a test success message';
    beforeEach(() => {
        render(<SuccessAlert message={successMessage} />);
    });

    test('renders the alert with the provided message', () => {

        // Check if the alert is rendered
        const alertElement = screen.getByRole('alert');
        expect(alertElement).toBeDefined();

        // Check if the message is rendered
        const messageElement = screen.getByText(successMessage);
        expect(messageElement).toBeDefined();
    });

    test('hides the alert when the close button is clicked', () => {

        // Click the close button
        const closeButton = screen.getAllByText('Close');
        fireEvent.click(closeButton[0]);
        fireEvent.click(closeButton[1]);

        // Check if the alert is hidden
        const alertElement = screen.queryByRole('alert');
        expect(alertElement).toBeNull();
    });
});
