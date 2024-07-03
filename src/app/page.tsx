"use client";

import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
	AppShell,
	AppShellHeader,
	Badge,
	Burger,
	Group,
	Text,
} from "@mantine/core";
import Navbar from "@/components/navbar";
import MainArea from "@/components/main";
import StepFooter from "@/components/footer";

export default function MainApplicationPage() {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
	const [stepIndex, setStepIndex] = useState<number>(0);
	const uploaded = stepIndex > 1;
	const [uploadFileName, setUploadFileName] = useState<string | undefined>();

	return (
		<main>
			<AppShell
				header={{ height: 45 }}
				footer={{ height: 70 }}
				padding="md"
				navbar={{
					width: "35vw",
					breakpoint: "sm",
					collapsed: {
						desktop: uploaded || !desktopOpened,
						mobile: uploaded || !mobileOpened,
					},
				}}
			>
				<AppShellHeader>
					<Group h="100%" px="md" justify="space-between">
						<Group>
							{uploaded ? (
								<></>
							) : (
								<Burger
									opened={mobileOpened}
									onClick={toggleMobile}
									hiddenFrom="sm"
									size="sm"
								/>
							)}
							{uploaded ? (
								<></>
							) : (
								<Burger
									opened={desktopOpened}
									onClick={toggleDesktop}
									visibleFrom="sm"
									size="sm"
								/>
							)}
							<Text>CO-PO Mapping</Text>
						</Group>
						{uploadFileName ? (
							<Badge variant="light">{uploadFileName}</Badge>
						) : (
							<></>
						)}
					</Group>
				</AppShellHeader>
				<Navbar stepIndex={0} />
				<MainArea stepIndex={0} onDrop={setUploadFileName} />
				<StepFooter stepIndex={0} />
			</AppShell>
		</main>
	);
}
