import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// --- Mock axios ---
const mock = new MockAdapter(axios);

// --- Shared mock risks ---
let mockRisks = [
    { id: 1, title: 'Risk #1', category: 'Technical', probability: 3, impact: 3, status: 'Open', project_id: '123' }
];

// --- Mock project data ---
const mockProject = {
    id: '123',
    name: 'Sample Project',
    description: 'Testing project',
    status: 'Active',
    duration_days: 60,
    team_size: 5,
    budget_lkr: 1000000,
    scope_description: 'Test scope',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

// --- Setup mock responses ---
mock.onGet('/projects/123').reply(200, mockProject);

mock.onGet('/risks').reply(() => {
    return [200, mockRisks];
});

mock.onPut(/\/risks\/\d+/).reply(config => {
    const id = parseInt(config.url.split('/').pop());
    mockRisks = mockRisks.map(risk =>
        risk.id === id
            ? { ...risk, status: risk.status === 'Open' ? 'Closed' : 'Open' }
            : risk
    );
    return [200];
});

mock.onPost('/risks').reply(config => {
    const newRisk = JSON.parse(config.data);
    const nextId = Math.max(...mockRisks.map(r => r.id)) + 1 || 2;
    mockRisks.push({ ...newRisk, id: nextId, status: 'Open' });
    return [200];
});

// --- Render helper ---
function renderComponent() {
    return render(
        <MemoryRouter initialEntries={['/projects/123']}>
            <ProjectDetailsPage />
        </MemoryRouter>
    );
}

// --- Tests ---
describe('ProjectDetailsPage', () => {

    it('renders heading', async () => {
        renderComponent();
        await screen.findByText(/Project Details/i);
    });

    it('renders project data', async () => {
        renderComponent();
        await screen.findByText(/Sample Project/i);
        await screen.findByText(/Testing project/i);
    });

    it('renders risk matrix', async () => {
        renderComponent();
        await waitFor(() => {
            expect(screen.getByText(/#1/)).toBeInTheDocument();
        });
    });

    it('allows adding a new risk', async () => {
        renderComponent();

        // ✅ Wait for heading and form to be sure the page loaded
        await screen.findByText(/Project Details/i);
        await screen.findByText(/Add New Risk to This Project/i);

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Risk' } });
        fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Business' } });

        fireEvent.change(screen.getByLabelText(/Probability/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/Impact/i), { target: { value: '5' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Create Risk/i }));

        // ✅ Check that the new risk appears in the table
        await waitFor(() => {
            expect(screen.getByText(/New Risk/i)).toBeInTheDocument();
        });

        // ✅ Check that the new risk also appears in the matrix
        await waitFor(() => {
            expect(screen.getByText(/#2/)).toBeInTheDocument();  // New risk should get ID #2
        });
    });

});
