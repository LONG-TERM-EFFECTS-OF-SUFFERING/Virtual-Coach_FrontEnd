import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import LoadingAlert from './LoadingAlert';

describe('LoadingAlert Component', () => {

    beforeEach(() => {
        render(<LoadingAlert />);
    });

    test('renders the loading alert with the correct content', () => {
        

        // Check if the loading alert is rendered
        const loadingAlertElement = screen.getByText('Loading...');
        expect(loadingAlertElement).toBeDefined();
    });
});
