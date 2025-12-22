import { useEffect, useState } from "react";
import { useAuth } from "../../app/context/UserAuthContext";

export function useNavigation() {
  const { getAllNavigation, user, loading, error } = useAuth();
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    if (!user?.role) {
      setNavItems([]);
      return;
    }
    const fetchNavItems = async () => {
      const navData = await getAllNavigation();
      const filteredNav = navData.filter(item =>
        item.roles?.includes(user.role)
      );
      setNavItems(filteredNav);
    };
    fetchNavItems();
  }, [getAllNavigation, user?.role]);

  return { navItems };
}
