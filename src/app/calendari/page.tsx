import DayOfTheMonth from "../components/Date/DayOfTheMonth";
import DaySelector from "../components/Schedule/DaySelector";
import SearchAndFilters from "../components/SearchAndFilters";
import useAirtimeApi from "../lib/hooks/useAirtimeApi";

const Calendar = async () => {
  const { getWeekInfo } = useAirtimeApi();

  const weekSchedule = await getWeekInfo();

  return (
    <main className="flex flex-col">
      <section className="mt-[219px] ">
        <ul className="flex flex-row gap-[376px]">
          <li>
            <span className="h-[22px] px-8 ">
              COMING UP /// TODAY & TOMORROW
            </span>
          </li>
          <li>
            <SearchAndFilters />
          </li>
        </ul>
        <DayOfTheMonth />
        {weekSchedule && <DaySelector scheduledShows={weekSchedule} />}
      </section>
    </main>
  );
};

export default Calendar;
