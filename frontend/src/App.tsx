
import {
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";

import {
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";

import ThemeContext from "./context/ThemeContext";

import {
    getCurrentUser,
    type AuthUser
} from "./api/auth";

import Header from "./components/Header";
import AuthStatus from "./components/AuthStatus";
import TaskManagerPage from "./pages/TaskManagerPage";

function App() {
    const { theme } = useContext(ThemeContext);

    // =====================================
    // AUTH STATE
    // =====================================

    const [user, setUser] = useState<AuthUser | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [authRetryCount, setAuthRetryCount] = useState(0);

    // =====================================
    // CHECK CURRENT SESSION
    // =====================================

    useEffect(() => {
        let ignore = false;

        async function checkSession() {
            try {
                const currentUser = await getCurrentUser();

                if (ignore) return;

                setUser(currentUser);
                setAuthError(null);
            } catch (error) {
                if (ignore) return;

                setUser(null);
                setAuthError(
                    error instanceof Error
                        ? error.message
                        : "Не вдалося перевірити сесію."
                );
            } finally {
                if (!ignore) {
                    setAuthLoading(false);
                }
            }
        }

        void checkSession();

        return () => {
            ignore = true;
        };
    }, [authRetryCount]);

    // =====================================
    // AUTH HANDLERS
    // =====================================

    function handleUserChange(nextUser: AuthUser | null) {
        setUser(nextUser);
        setAuthError(null);
    }

    function handleRetryAuth() {
        setAuthLoading(true);
        setAuthError(null);
        setAuthRetryCount((current) => current + 1);
    }

    const handleUnauthorized = useCallback(() => {
        setUser(null);
        setAuthError(null);
    }, []);

    // =====================================
    // PROTECTED TASK MANAGER
    // =====================================

    const tasksElement = authLoading ? (
        <main className="account-page">
            <p role="status">
                Перевіряємо авторизацію...
            </p>
        </main>
    ) : authError ? (
        <main className="account-page">
            <h1>Task Manager</h1>

            <p>
                Не вдалося перевірити сесію.
                Перевірте з'єднання із сервером.
            </p>

            <Link to="/account">
                Перейти до акаунту →
            </Link>
        </main>
    ) : user ? (
        <TaskManagerPage
            key={user.id}
            onUnauthorized={handleUnauthorized}
        />
    ) : (
        <main className="account-page">
            <h1>Welcome to Task Manager</h1>

            <p>
                Увійдіть або зареєструйтеся,
                щоб керувати своїми завданнями.
            </p>

            <Link to="/account">
                Увійти або створити акаунт →
            </Link>
        </main>
    );

    // =====================================
    // APPLICATION ROUTES
    // =====================================

    return (
        <div className={theme}>
            <Header />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate to="/tasks" replace />
                    }
                />

                <Route
                    path="/tasks"
                    element={tasksElement}
                />

                <Route
                    path="/account"
                    element={
                        <main className="account-page">
                            <AuthStatus
                                user={user}
                                loading={authLoading}
                                error={authError}
                                onUserChange={handleUserChange}
                                onRetry={handleRetryAuth}
                            />
                        </main>
                    }
                />

                <Route
                    path="*"
                    element={
                        <main className="account-page">
                            <h1>Page not found</h1>

                            <p>
                                This page does not exist.
                            </p>

                            <Link to="/tasks">
                                Back to Task Manager →
                            </Link>
                        </main>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
