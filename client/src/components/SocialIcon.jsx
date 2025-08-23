import toast from "react-hot-toast";

export const SocialIcon = ({ icon, link, name }) => {
  const isActive = link?.trim();

  const handleClick = () => {
    if (!isActive) {
      toast.error(`${name} link not provided`);
    }
  };

  const commonClasses = "w-[37px] transition-transform duration-300 hover:scale-110 hover:shadow-md rounded-md hover:border-[2px]";

  return isActive ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={`${name}-icon`} className={`${commonClasses} cursor-pointer`} />
    </a>
  ) : (
    <img
      src={icon}
      alt={`${name}-icon`}
      title="Link not provided"
      onClick={handleClick}
      className={`${commonClasses} cursor-pointer`}
    />
  );
};