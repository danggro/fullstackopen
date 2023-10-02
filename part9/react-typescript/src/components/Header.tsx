interface HeaderProp {
  courseName: string;
}

const Header = (prop: HeaderProp) => {
  return <h1>{prop.courseName}</h1>;
};

export default Header;
