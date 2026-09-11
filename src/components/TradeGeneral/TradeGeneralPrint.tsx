import { useRef, useState } from "react";
import { daysEnum, getDaysInMonth, monthEnum } from "../../utils/dateFunction";
import styles from "./tradePrint.module.css";
import { useReactToPrint } from "react-to-print";

function TradeGeneralPrint() {
  const [value, setValue] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const [weeks, setWeeks] = useState(getDaysInMonth(value.month, value.year));

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "My Printable Section",
  });

  const tradeType = ["Nifty", "Sensex", "Go/Si", "Crude"];
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setWeeks(getDaysInMonth(value.month, value.year));
        }}
        className={styles.form}
      >
        <select
          value={value.month}
          onChange={(e) => {
            setValue((prev) => ({ ...prev, month: +e.target.value }));
          }}
        >
          {Object.entries(monthEnum)
            .filter(([key]) => isNaN(Number(key))) // keep only name→value pairs
            .map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
        </select>
        <input
          type="number"
          min={1900}
          max={2100}
          step={1}
          placeholder="YYYY"
          value={value.year}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, year: +e.target.value }))
          }
        />
        <button type="submit">Get</button>
        <button type="button" onClick={handlePrint}>
          Print
        </button>
      </form>
      <div ref={componentRef} className={`printable-area ${styles.container}`}>
        <div className={styles.heading}>
          <span>
            {monthEnum[value.month]} {value.year}
          </span>
        </div>
        <div
          className={styles.sheet}
          style={{ gridTemplateRows: `24px repeat(${weeks.length},1fr)` }}
        >
          {Array.from({ length: 7 }, (_, i) => daysEnum[i + 1]).map((d) => (
            <div key={d} className={styles.dayName}>
              {d}
            </div>
          ))}
          {weeks.map((week, wi: number) =>
            week.map((day, di) => {
              const holiday = day == "X" || [0, 6].includes(di);
              return (
                <div className={styles.cell} key={`${wi}_${di}`}>
                  {!holiday && (
                    <div>
                      <div className={styles.day}>{day}</div>
                      <table>
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Count</th>
                            <th>PnL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tradeType.map((type) => (
                            <tr key={type}>
                              <td>{type}:</td>
                              <td></td>
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {holiday && <div className={styles.X}>{day}</div>}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </>
  );
}

export default TradeGeneralPrint;
