import React from "react";
import ReactDOM from "react-dom/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PenTool from "@/components/PenTool";
import HighlighterTool from "@/components/HighlighterTool";
import Highlights from "@/components/Highlights";
import SummarizeButton from "@/components/SummarizeButton";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import "~/assets/global.css";
import { Provider, useDispatch } from "react-redux";
import { persistorStore, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { clearUser, setUser } from "@/store/slices/authSlice";
import { supabase } from "@/lib/supabase";
import SyncButtons from "@/components/SyncButtons";

function SidePanelApp() {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(true);

	useEffect(() => {
		async function syncState() {
			const { sidepanel_open } = await browser.storage.local.get(
				"sidepanel_open"
			);
			const actualState = sidepanel_open ?? true;
			console.log("actual state :", actualState);
			setIsOpen(actualState);
		}

		syncState();

		const listener = (changes: any) => {
			if (changes.sidepanel_open) {
				const newState = changes.sidepanel_open.newValue ?? true;
				setIsOpen(newState);
			}
		};

		browser.storage.onChanged.addListener(listener);
		return () => browser.storage.onChanged.removeListener(listener);
	}, []);

	useEffect(() => {
		console.log("isopen value :", isOpen);
		browser.runtime.sendMessage({
			action: "toggleSidepanel",
			payload: { isOpen: isOpen },
		});
	}, [isOpen]);

	useEffect(() => {
		// sync locally set user session to each active side panel, as each tab is independent
		async function restoreSession() {
			const { supabase_session } = await browser.storage.local.get(
				"supabase_session"
			);

			if (supabase_session) {
				await supabase.auth.setSession({
					access_token: supabase_session.access_token,
					refresh_token: supabase_session.refresh_token,
				});

				// Get current user and update Redux
				const {
					data: { user },
				} = await supabase.auth.getUser();
				// helps syncing store of each individual tab as we are using session storage
				if (user) {
					dispatch(
						setUser({
							id: user.id,
							email: user.email || "email is undefined",
						})
					);
				}
			}
		}

		restoreSession();

		// sync updates and refresh token
		const listener = (changes: any, areaName: string) => {
			if (areaName === "local" && changes.supabase_session) {
				console.log("changes detected");
				const session = changes.supabase_session.newValue;

				if (session) {
					supabase.auth.setSession({
						access_token: session.access_token,
						refresh_token: session.refresh_token,
					});
					dispatch(setUser(session.user));
				} else {
					dispatch(clearUser());
				}
			}
		};

		browser.storage.onChanged.addListener(listener);
		return () => {
			browser.storage.onChanged.removeListener(listener);
		};
	}, []);

	return (
		<div className="h-screen w-full flex items-center">
			<div className="h-full w-full flex flex-col justify-between ml-auto border-border border-l-1">
				<Header />

				<div className="flex-1 overflow-y-auto custom-scrollbar">
					<div className="p-4 space-y-4">
						<TooltipProvider>
							<Card className="p-4 space-y-3 bg-card border-border">
								<h3 className="font-medium text-sm text-foreground">Tools</h3>
								<PenTool />
								<HighlighterTool />
							</Card>
						</TooltipProvider>
						<SummarizeButton />
						<SyncButtons />
						<Highlights />
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistorStore}>
				<SidePanelApp />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
