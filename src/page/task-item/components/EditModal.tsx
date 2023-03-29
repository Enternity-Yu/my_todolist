import React from 'react';
import { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { EditFormValues } from '../../../type';

interface middleProps {
	visible: boolean;
	onCancel: () => void;
	onSave: (values: EditFormValues) => Promise<void>;
	initialValue: EditFormValues;
}

const EditModal: React.FC<middleProps> = (props: middleProps) => {
	const { visible, onCancel, onSave, initialValue } = props;
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			setLoading(true);
			await onSave(values);
			setLoading(false);
			onCancel();
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancel = () => {
		form.setFieldsValue(initialValue);
		onCancel();
	};

	return (
		<Modal
			centered
			destroyOnClose={true}
			maskClosable={false}
			closable={false}
			open={visible}
			title="Edit"
			onCancel={handleCancel}
			onOk={handleSave}
			confirmLoading={loading}>
			{' '}
			<Form form={form} initialValues={initialValue}>
				{' '}
				<Form.Item
					label="TaskName"
					name="name"
					rules={[{ required: true, message: 'Please input task-name!' }]}>
					{' '}
					<Input data-testid="change-name-input" />
				</Form.Item>{' '}
			</Form>{' '}
		</Modal>
	);
};

export default EditModal;
