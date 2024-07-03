import {
	AppShellNavbar,
	Button,
	Center,
	CloseButton,
	Divider,
	Group,
	Paper,
	Text,
} from "@mantine/core";
import React from "react";

export const steps = [
	{
		name: "Upload Excel",
		description:
			"In this step we would upload an excel and the enter the number of exams conducted for a course, Please follow the format mentioned in the sample file attached below.",
		references: (
			<Text c="dimmed" fz="xs">
				So the deal is, we want to spy on you. We would like to know
				what did you have for todays breakfast, where do you live,
				how much do you earn and like 50 other things. To view our
				landing page you will have to accept all cookies.
				That&apos;s all, and remember that we are watching...
			</Text>
		),
	},
	{
		name: "Confirm the Tables",
		description:
			"Please confirm the mapped tables. tables are fetched from all the worksheets in the excel file and the required tables are mapped by default. Please inspect the defaults and check if any modifications are necessary and if required configure them accordingly.",
		references: "Please enter the number of exams",
	},
];

export default function Navbar(properties: { stepIndex: number }) {
	
	const index = properties.stepIndex;
	const activeStep = steps[index];

	return (
		<AppShellNavbar p="md" maw={"35vw"}>
			{
                activeStep ? <Group>
				<Paper radius="md">
					<Group justify="space-between" align="baseline">
						<Text fz="md" fw={500}>
							{activeStep.name}
						</Text>
						<Text fz="xs" c="dimmed">
							{`Step ${index + 1}`}
						</Text>
					</Group>
					<Divider mx="xs" my="xs" mb={"sm"} />
					<Text c="dimmed" fz="xs" mx="xs">
						{activeStep.description}
					</Text>
				</Paper>
				<Paper radius="md">
					<Text fz="md" fw={500}>
						References
					</Text>
					<Divider mx="xs" my="xs" mb={"sm"} />
					<Text c="dimmed" fz="xs" mx="xs">
						{activeStep.references}
					</Text>
				</Paper>
			</Group> : <></>
            }
		</AppShellNavbar>
	);
}
