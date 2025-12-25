export default function Header({ menuIsActive, setMenuIsActive }) {
  return (
    <div className="fixed top-0 z-4 flex w-full justify-end p-10 box-border">
      <div
        onClick={() => {
          setMenuIsActive(!menuIsActive);
        }}
        className={`relative flex flex-col cursor-pointer ${
          menuIsActive ? "burgerActive" : "burger"
        }`}
      >
        <div
          className={`w-7 h-0.5 bg-black relative transition-transform duration-300 ${
            menuIsActive ? "rotate-45 top-px" : "-top-1.5"
          }`}
        />
        <div
          className={`w-7 h-0.5 bg-black relative transition-transform duration-300 ${
            menuIsActive ? "-rotate-45" : "top-1.5"
          }`}
        />
      </div>
    </div>
  );
}
