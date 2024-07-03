import {
	AppShellFooter,
	Button,
	Divider,
	Group,
	Portal,
	Stepper,
	StepperStep,
} from "@mantine/core";
import { ReactNode } from "react";
import { steps } from "./navbar";

export const formId = (stepIndex: number, include?: boolean) => `${include ? '#' : ''}step-${stepIndex}-form`


export default function StepFooter(properties: {
	stepIndex: number;
}): ReactNode {
	return (
		<AppShellFooter p="lg">
			<Group wrap="nowrap" justify="space-between" align="center">
				<Stepper
					color="orange"
					active={properties.stepIndex}
					maw={400}
					size="sm"
					style={{ flexGrow: 2 }}
				>
					<StepperStep label="Step 1" description={steps[0].name} />
					<StepperStep label="Step 2" description={steps[1].name} />
				</Stepper>
				<Portal target={formId(properties.stepIndex, true)}>
				<Button variant="light" type="submit">
					Next
				</Button>
				</Portal>
			</Group>
		</AppShellFooter>
	);
}
