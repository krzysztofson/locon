import { can, Role } from "../modules/auth/rbac";
import { User } from "../modules/auth/types";

const base: Omit<User, "role"> = {
  id: "u1",
  name: "Test User",
  email: "test@example.com",
  phone: "123456789",
};

const mockUser = (role: Role): User => ({ ...base, role });

describe("RBAC zones", () => {
  test("admin can create", () => {
    expect(can(mockUser("admin"), "create", "zones")).toBe(true);
  });
  test("viewer cannot delete", () => {
    expect(can(mockUser("viewer"), "delete", "zones")).toBe(false);
  });
  test("user can read", () => {
    expect(can(mockUser("user"), "read", "zones")).toBe(true);
  });
});
