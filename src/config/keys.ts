interface IKeys {
	test: string | undefined;
}

const keys: IKeys = {
	test: process.env.REACT_APP_TEST
};

export default keys;
