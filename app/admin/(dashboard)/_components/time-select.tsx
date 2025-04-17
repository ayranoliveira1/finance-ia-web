// "use client";

// import {
//    Select,
//    SelectContent,
//    SelectItem,
//    SelectTrigger,
//    SelectValue,
// } from "@/app/_components/ui/select";
// import { useRouter, useSearchParams } from "next/navigation";

// const MONTH_OPTIONS = [
//    { value: "1", label: "January" },
//    { value: "02", label: "February" },
//    { value: "03", label: "March" },
//    { value: "04", label: "April" },
//    { value: "05", label: "May" },
//    { value: "06", label: "June" },
//    { value: "07", label: "July" },
//    { value: "08", label: "August" },
//    { value: "09", label: "September" },
//    { value: "10", label: "October" },
//    { value: "11", label: "November" },
//    { value: "12", label: "December" },
// ];

// const YEAR_OPTIONS = [{ value: "2025", label: "2025" }];

// const TimeSelect = () => {
//    const { push } = useRouter();

//    const handleMonthChange = (newMonth: string, newYear: string) => {
//       push(`/?month=${newMonth}&year=${newYear}`);
//    };

//    const searchParams = useSearchParams();
//    const month = searchParams.get("month") ?? "";
//    const year = searchParams.get("year") ?? "";

//    return (
//       <div className="flex items-center gap-4">
//          <Select
//             onValueChange={(newMonth) => handleMonthChange(newMonth, year)}
//             defaultValue={month}
//          >
//             <SelectTrigger className="w-[150px] rounded-full">
//                <SelectValue placeholder="Mês" />
//             </SelectTrigger>
//             <SelectContent>
//                {MONTH_OPTIONS.map((option) => (
//                   <SelectItem key={option.value} value={option.value}>
//                      {option.label}
//                   </SelectItem>
//                ))}
//             </SelectContent>
//          </Select>

//          <Select
//             onValueChange={(newYear) => handleMonthChange(newYear, month)}
//             defaultValue={year}
//          >
//             <SelectTrigger className="w-[150px] rounded-full">
//                <SelectValue placeholder="Ano" />
//             </SelectTrigger>
//             <SelectContent>
//                {YEAR_OPTIONS.map((option) => (
//                   <SelectItem key={option.value} value={option.value}>
//                      {option.label}
//                   </SelectItem>
//                ))}
//             </SelectContent>
//          </Select>
//       </div>
//    );
// };

// export default TimeSelect;
