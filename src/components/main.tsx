"use client";

import {
	AppShellMain,
	Divider,
	Group,
	InputWrapper,
	NumberInput,
	ScrollAreaAutosize,
	Stack,
	Text,
	Button,
} from "@mantine/core";
import React, { ReactNode, useState } from "react";
import TakeExcelFile from "./take-excel";
import { useForm } from "@mantine/form";
import { PythonProvider, usePython } from "react-py";

function Step1Form(properties: {
	onDrop: (file?: File, numberOfExams?: number) => void;
	lock?: boolean;
	waitFor?: boolean;
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
			<Stack
				justify="space-around"
				align="stretch"
				ml="sm"
				mt="md"
			>
				<TakeExcelFile
					onDrop={(file) => form.setFieldValue("file", file)}
					lock={properties.lock}
				/>
				<Divider />
				<Group align="end">
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
							disabled={properties.lock}
							max={10}
							required={true}
							mt="sm"
							withAsterisk
							{...form.getInputProps("exams")}
							error=""
						/>
					</InputWrapper>
					<Button variant="light" type="submit" disabled={properties.lock || properties.waitFor}>
						Next
					</Button>
					
				</Group>
				{properties.lock ? <Text fs="italic" size="sm" c="gray">Processing...</Text> : <></>}
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
	const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

	switch (index) {
		case 0: {
			toShow = (
				<Step1Form
					lock={isRunning}
					waitFor={isLoading}
					onDrop={async (file, numberOfExams) => {
						setUploadedFile(file);
						// properties.onDrop(file?.name);
						// await sampleExample();
						runPython(
							"import time; time.sleep(10); print('Hello');"
						);
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
		<AppShellMain mt="md">
			<ScrollAreaAutosize
				h={
					"calc(90vh - (var(--app-shell-header-height, 0px) + var(--app-shell-footer-height, 0px)))"
				}
				w={"calc(92vw - var(--app-shell-navbar-width, 0px))"}
			>
				<PythonProvider>
					{toShow}
					{/* {stdout} */}
				</PythonProvider>
			</ScrollAreaAutosize>
		</AppShellMain>
	);
}
