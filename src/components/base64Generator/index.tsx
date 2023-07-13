import { Button, Container, Image } from "@chakra-ui/react";
import { useState } from "react";

export const Base64Generator = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [imgBase64, setImgBase64] = useState<string>("");

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

			if (allowedFormats.includes(file.type)) {
				convertToBase64(file)
					.then((base64String) => {
						setImgBase64(base64String); // Aqui você pode fazer o que quiser com a string em base64
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				throw new Error("Antonio");
			}
		}
	};

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			setIsLoading(true);
			const reader = new FileReader();

			reader.onload = () => {
				const base64String = reader.result as string;
				resolve(base64String);
				setIsLoading(false);
			};

			reader.onerror = (error) => {
				reject(error);
				setIsLoading(false);
			};

			reader.readAsDataURL(file);
		});
	};

	return (
		<Container boxSize={"container.lg"}>
			{isLoading && <p>Loading...</p>}
			{!isLoading && imgBase64 && (
				<Image src={imgBase64} width="200px" height="200px" />
			)}
			<input
				type="file"
				accept="image/jpg, image/jpeg, image/jpg"
				onChange={handleFileSelect}
			/>
			<Button onClick={() => setImgBase64("")}>Clear</Button>
		</Container>
	);
};
