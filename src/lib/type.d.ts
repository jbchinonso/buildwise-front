interface IDashboardStatsCardProps {
  title?: string;
  icon?: React.ReactNode | string;
  theme?: string;
  data?: string|number;
  onClick?: () => void;
}

interface IDashboardTileCardProps {
  className?: string,
  data?: any,
  dataClassName?: string,
  dataContainerClassName?: string,
  labelClassName?: string,
  label?: string,
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
