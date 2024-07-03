import {
	AppShellMain,
	Divider,
	Group,
	InputWrapper,
	NumberInput,
	ScrollAreaAutosize,
	Stack,
	Text,
} from "@mantine/core";
import React, { ReactNode, useState } from "react";
import TakeExcelFile from "./take-excel";
import { useForm } from "@mantine/form";
import { formId } from "./footer";
import init, { greet } from "../../pkg/co_po_mapping";


async function sampleExample() {
	await init();
	greet("hello there");
}


function Step1Form(properties: {
	onDrop: (file?: File, numberOfExams?: number) => void;
}): ReactNode {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			exams: 0,
			file: undefined,
		} as { exams: number; file?: File },
		validate: {
			file: (value) =>
				value ? null : "Please upload a file to move to next step",
			exams: (value) =>
				value > 0 ? null : "Please set the number of exams",
		},
	});

	const [errorMessage, setErrorMessage] = useState<string | undefined>();

	return (
		<form
			onSubmit={form.onSubmit(
				(values) => {
					setErrorMessage("");
					properties.onDrop(values.file, values.exams);
				},
				(errors) =>
					setErrorMessage((errors.file || errors.exams) as string)
			)}
		>
			<Stack justify="space-around" align="stretch">
				<TakeExcelFile
					onDrop={(file) => form.setFieldValue("file", file)}
				/>
				<Divider />
				<Group align="end" id={formId(0)}>
					<InputWrapper
						style={{ flexGrow: 1 }}
						description={
							<Group justify="space-between" align="baseline">
								<Text size="sm">Enter the Number of Exams</Text>
								<Text c="red" size="xs">
									{errorMessage}
								</Text>
							</Group>
						}
					>
						<NumberInput
							key={form.key("exams")}
							placeholder="Number of Exams"
							min={0}
							max={10}
							required={true}
							mt="sm"
							withAsterisk
							{...form.getInputProps('exams')}
							error=""
						/>
					</InputWrapper>
				</Group>
			</Stack>
		</form>
	);
}

export default function MainArea(properties: {
	stepIndex: number;
	onDrop: (fileName?: string) => void;
}): ReactNode {
	const index = properties.stepIndex;
	let toShow = <></>;
	const [uploadedFile, setUploadedFile] = useState<File | undefined>();

	switch (index) {
		case 0: {
			toShow = (
				<Step1Form
					onDrop={(file, numberOfExams) => {
						setUploadedFile(file);
						properties.onDrop(file?.name);
						sampleExample();
					}}
				/>
			);
			break;
		}
		default: {
			break;
		}
	}
	return (
		<AppShellMain>
			<ScrollAreaAutosize
				h={
					"calc(90vh - (var(--app-shell-header-height, 0px) + var(--app-shell-footer-height, 0px)))"
				}
			>
				<Stack
					w={"calc(92vw - var(--app-shell-navbar-width, 0px))"}
					justify="space-between"
					h="100%"
				>
					{toShow}
				</Stack>
			</ScrollAreaAutosize>
		</AppShellMain>
	);
}
