import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IProtectedRoute {
	isAllowed: boolean;
	redirectPath: string;
}
export function ProtectedRoute({ isAllowed, redirectPath }: IProtectedRoute) {
	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
}
