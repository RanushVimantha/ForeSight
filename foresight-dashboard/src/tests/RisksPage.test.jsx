import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RisksPage from '@pages/RisksPage';
import axiosInstance from '../api/axiosInstance';
import { vi } from 'vitest';

vi.mock('../api/axiosInstance');

describe('RisksPage', () => {

    beforeEach(() => {
        axiosInstance.get.mockImplementation((url) => {
            if (url === '/risks') {
                return Promise.resolve({
                    data: [
                        {
                            id: 1,
                            title: 'Risk 1',
                            category: 'Financial',
                            project_id: 1,
                            probability: 3,
                            impact: 3,
                            status: 'Open'
                        }
                    ]
                });
            } else if (url === '/projects') {
                return Promise.resolve({
                    data: [
                        { id: 1, name: 'Project Alpha' },
                        { id: 2, name: 'Project Beta' }
                    ]
                });
            }
            return Promise.reject(new Error('Unknown URL'));
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('renders Risks page title', async () => {
        render(
            <BrowserRouter>
                <RisksPage />
            </BrowserRouter>
        );

        // Wait for the Risks heading to appear
        const title = await screen.findByText(/Risks/i);
        expect(title).toBeInTheDocument();
    });

    test('shows risk from mock data', async () => {
        render(
            <BrowserRouter>
                <RisksPage />
            </BrowserRouter>
        );

        // Wait for risk title to appear
        const riskTitle = await screen.findByText(/Risk 1/i);
        expect(riskTitle).toBeInTheDocument();
    });

});
