import { Group, Paper, rem, Text } from "@mantine/core";
import React, { ReactNode, useState } from "react";
import {
	Dropzone,
	DropzoneProps,
	FileRejection,
	MIME_TYPES,
} from "@mantine/dropzone";
import { IconUpload, IconX, IconFileExcel } from "@tabler/icons-react";

export default function TakeExcelFile(properties: {
	stimulateLoading?: DropzoneProps["loading"];
	onDrop: (file?: File) => void;
	lock?: boolean;
}): ReactNode {
	const [loading, setLoading] = useState<boolean>(
		properties.stimulateLoading ?? false
	);
    const [fileName, setFileName] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

    const reset = () => {
        setFileName(() => "");
        setErrorMessage(() => "")
        properties.onDrop();
    }

	function handleErrorFileUpload(files: FileRejection[]) {
        reset();
		if (files.length > 1) {
			setErrorMessage(() => "Please do not upload more than one file");
		} else {
			const errors = Array.from(
				new Set(files.at(0)?.errors?.map((err) => err?.message))
			);
			setErrorMessage(
				() => errors.length === 1
					? errors[0]
					: JSON.stringify(errors, null, 4)
			);
		}
	}

	return (
		<Paper withBorder radius="md">
			<Dropzone
				loading={loading}
				onDrop={(files) => {
                    reset();
					const file = files.at(0) as File;
                    setFileName(file.name);
                    properties.onDrop(file);
				}}
				onReject={handleErrorFileUpload}
				maxSize={5 * 1024 ** 2}
				accept={[MIME_TYPES.xls, MIME_TYPES.xlsx]}
				maxFiles={1}
				multiple={false}
				disabled={properties.lock}
			>
				<Group
					justify="center"
					gap="xl"
					mih={220}
					style={{ pointerEvents: "none" }}
				>
					<Dropzone.Accept>
						<IconUpload
							style={{
								width: rem(52),
								height: rem(52),
								color: "var(--mantine-color-blue-6)",
							}}
							stroke={1.5}
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX
							style={{
								width: rem(52),
								height: rem(52),
								color: "var(--mantine-color-red-6)",
							}}
							stroke={1.5}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconFileExcel
							style={{
								width: rem(52),
								height: rem(52),
								color: "var(--mantine-color-dimmed)",
							}}
							stroke={1.5}
						/>
					</Dropzone.Idle>

					<div>
						<Text size="sm" c="dimmed" inline mt={7}>
							Attach .xlsx or .xls, each file should not exceed
							5mb
						</Text>
						<Text size="xl" inline mt="sm">
							Drag and drop your Excel file here
						</Text>
						{errorMessage || fileName ? (
							<Text size="xs" c={errorMessage ? "red" : "green"} inline mt={7}>
								{errorMessage || `${fileName} was uploaded successfully`}
							</Text>
						) : (
							<></>
						)}
					</div>
				</Group>
			</Dropzone>
		</Paper>
	);
}
