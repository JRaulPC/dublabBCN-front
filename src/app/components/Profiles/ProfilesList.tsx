import { ApiProfile, Bside } from "../../types";
import useMousePosition from "../ShowGrid/useMousePosition";
import ProfileCard from "./ProfileCard";

interface ProfilesListProps {
  firstPageOfProfiles: ApiProfile[] | Bside[];
}

const ProfilesList = ({ firstPageOfProfiles }: ProfilesListProps) => {
  const mousePosition = useMousePosition();

  // Splitting the profiles into columns
  const columnsCount = 4;
  const profilesPerColumn = Math.ceil(
    firstPageOfProfiles.length / columnsCount
  );

  const columns: (ApiProfile[] | Bside[])[] = [];
  for (let i = 0; i < columnsCount; i++) {
    columns.push(
      firstPageOfProfiles.slice(
        i * profilesPerColumn,
        (i + 1) * profilesPerColumn
      )
    );
  }

  // Calculate the offset based on mouse position for horizontal movement
  const calculateHorizontalOffset = (index: number) => {
    const columnWidth = 50; // Replace this with your column width or use dynamic calculation
    const mouseX = mousePosition.x;
    let offset = (mouseX / columnWidth) * index; // Adjust the multiplier for smoother movement

    // Calculate the maximum offset based on the screen's middle for columns 1 and 2
    if (index === 1 || index === 2) {
      const maxOffset = window.innerWidth / 2;
      offset = Math.max(-maxOffset, Math.min(maxOffset, offset));
    } else {
      // Calculate the maximum offset based on the other column for columns 0 and 3
      const oppositeColumnIndex = index === 0 ? 3 : 0;
      const oppositeColumnOffset = (mouseX / columnWidth) * oppositeColumnIndex;
      offset = Math.max(
        -oppositeColumnOffset,
        Math.min(oppositeColumnOffset, offset)
      );
    }

    return `${offset}px`;
  };

  const calculateVerticalTranslate = (profileIndex: number) => {
    const mouseY = mousePosition.y;
    const translate = (mouseY / 900) * -5; // Adjust the multiplier for smoother movement
    const verticalOffset = (Math.random() - 0.5) * 1; // Randomize between -5 and 5 for vertical movement
    const yOffset = 5; // Define the fixed yOffset

    // Calculate the direction based on mouse movement
    const direction = mouseY - window.innerHeight / 2;

    let itemTranslate = translate + verticalOffset;

    // Odd-indexed items move down when mouse moves up, even-indexed move up when mouse moves down
    if (
      (profileIndex % 2 === 0 && direction < 0) ||
      (profileIndex % 2 !== 0 && direction > 0)
    ) {
      itemTranslate += yOffset * (direction / 100);
    } else {
      itemTranslate -= yOffset * (direction / 100);
    }

    return `translateY(${itemTranslate}px)`; // Apply individual item's vertical movement offset
  };

  const randomizePosition = () => {
    const randomOffset =
      Math.random() > 1.5 ? Math.random() * 15 + 10 : -Math.random() * 15 - 2;
    return `${randomOffset}px`;
  };

  const getRandomHeight = () => {
    const heights = [150, 200, 300];
    const randomIndex = Math.floor(Math.random() * heights.length);
    const selectedHeight = heights[randomIndex];
    return `${selectedHeight}px`;
  };

  return (
    <div className="grid grid-cols-4 px-[31px] gap-x-3 gap-y-14 mt-16 max-w-[100vw]">
      {columns.map((column, columnIndex) => (
        <ul
          key={columnIndex}
          style={{
            marginLeft: calculateHorizontalOffset(columnIndex),
            transform: calculateVerticalTranslate(columnIndex),
            marginRight: columnIndex === 3 ? "16px" : undefined,
          }}
        >
          {column.map((profile, profileIndex) => (
            <li
              key={profile.slug}
              style={{
                marginLeft: `${profileIndex * 20}px`,
                marginRight: randomizePosition(),
                marginBottom: "70px",
                transform: calculateVerticalTranslate(profileIndex),
                marginTop: calculateVerticalTranslate(profileIndex),
                position: "relative",
                zIndex: profileIndex % 2 === 0 ? 1 : 0,
              }}
              className="px-4"
            >
              <ProfileCard profile={profile} height={getRandomHeight()} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default ProfilesList;
