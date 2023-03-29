import React from 'react';
import { Modal } from 'antd';

type middleProps = {
	visible: boolean;
	onOk: () => void;
	onCancel: () => void;
};

const DeleteModal: React.FC<middleProps> = (props: middleProps) => {
	const { visible, onCancel, onOk } = props;
	return (
		<Modal
			title="Confirm Delete"
			okText="Yes"
			cancelText="No"
			okType="danger"
			open={visible}
			onOk={onOk}
			onCancel={onCancel}
			centered
			destroyOnClose={true}
			maskClosable={false}
			closable={false}>
			<p>Are you sure delete this task?</p>
		</Modal>
	);
};

export default DeleteModal;
