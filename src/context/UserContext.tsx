import React, {
	Dispatch,
	SetStateAction,
	FC,
	PropsWithChildren,
	createContext,
	useState,
} from 'react';

export function createUserContext<A>(
	defaultValue: A
): [
	React.Context<{ user: A; setUser: Dispatch<SetStateAction<A>> }>,
	FC<PropsWithChildren>
] {
	type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
	const defaultUpdate: UpdateType = () => defaultValue;

	const UserContext = createContext({
		user: defaultValue,
		setUser: defaultUpdate,
	});

	function UserContextProvider(props: PropsWithChildren) {
		const [user, setUser] = useState(defaultValue);
		return (
			<UserContext.Provider
				value={{ user, setUser }}
				{...props}
			></UserContext.Provider>
		);
	}

	return [UserContext, UserContextProvider];
}
