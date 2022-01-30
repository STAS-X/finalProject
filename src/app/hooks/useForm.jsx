import { useState } from "react";

const useForm = (initialState={}, onSubmit) => {
	const [form, setForm] = useState(initialState);
console.log(form);
	const handleSubmit = (e) => {
		e.preventDefault();
        console.log(onSubmit, form);
        onSubmit(form);
	};

	const handleChange = (target) => {
		setForm((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	return {form, handleChange, handleSubmit } 
};

export default useForm;