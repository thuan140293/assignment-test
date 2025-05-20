import api from "@/core/services/api";
import type { UserListType } from "@/core/types";

/** Get list of users */
async function fetchUsers(): Promise<UserListType[]> {
    const { data } = await api.get<UserListType[]>("users");
    return data;
}

/** Get details of 1 user */
async function fetchUser(id: string): Promise<UserListType> {
    const { data } = await api.get<UserListType>(`users/${id}`);
    return data;
}

/**
 * Create new user
 * @param userPayload Data used to create new user
 */
async function newUser(
    userPayload: Omit<UserListType, "id" | "date">
): Promise<UserListType> {
    const { data } = await api.post<UserListType>("users", userPayload);
    return data;
}

/**
 * Update a user
 */
async function updateUser(
    id: string,
    userPayload: Partial<UserListType>
): Promise<UserListType> {
    const { data } = await api.put<UserListType>(`users/${id}`, userPayload);
    return data;
}

/**
 * Delete a user
 */
async function deleteUser(
    id: string,
): Promise<UserListType> {
    const { data } = await api.delete<UserListType>(`users/${id}`);
    return data;
}

export {
    fetchUsers,
    fetchUser,
    newUser,
    updateUser,
    deleteUser
}