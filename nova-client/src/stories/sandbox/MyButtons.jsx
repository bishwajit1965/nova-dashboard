import { PrinterCheck } from "lucide-react";

import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/ButtonGroup";
import IconButton from "../../components/ui/IconButton";
import { LucideIcon } from "../../lib/LucideIcons";

const MyButtons = () => {
  return (
    <div className="bg-base-50 p-6 rounded-lg shadow space-y-6">
      {/* 1️⃣ Normal buttons with icon, loading */}
      <div className="flex justify-center lg:mb-8 mb-2">
        <h1 className="lg:text-3xl text-xl font-bold flex items-center gap-2">
          <LucideIcon.Layers3Icon /> Demo Buttons Displayed
        </h1>
      </div>

      <div className="flex gap-4">
        <Button variant="primary" size="sm" icon={LucideIcon.Save}>
          Save
        </Button>
        <Button variant="success" size="sm" icon={LucideIcon.CircleCheck}>
          Success Button
        </Button>
        <Button variant="secondary" size="sm" icon={LucideIcon.ClipboardCheck}>
          Button
        </Button>
        <Button variant="danger" size="sm" loading>
          Deleting
        </Button>
        <Button variant="green" size="sm" icon={LucideIcon.CircleCheck}>
          Green
        </Button>
        <Button variant="green" size="sm" disabled>
          Disabled
        </Button>
        <Button variant="muted" size="sm">
          Muted Button
        </Button>
        {/* <Button variant="outline">Outline Button</Button> */}
        <Button variant="ghost" size="sm">
          Ghost Button
        </Button>
        <Button variant="cyan" size="sm" icon={PrinterCheck}>
          Cyan Button
        </Button>
      </div>

      {/* 2️⃣ Icon buttons for edit/delete/etc */}
      <div className="flex gap-4">
        <IconButton icon={LucideIcon.FilePenLine} tooltip="Edit this item" />
        <IconButton
          icon={LucideIcon.Check}
          variant="success"
          tooltip="Success button"
        />
        <IconButton
          icon={LucideIcon.Trash2}
          variant="danger"
          tooltip="Delete this item"
        />
        <IconButton
          icon={LucideIcon.ListCheck}
          variant="cyan"
          tooltip="Info Button"
        />
      </div>

      {/* 3️⃣ Grouped buttons for filters/sorting */}
      <ButtonGroup>
        <Button variant="success" size="md" icon={LucideIcon.Clock}>
          Today
        </Button>
        <Button variant="primary" size="md" icon={LucideIcon.CalendarDays}>
          This Week
        </Button>
        <Button variant="ghost" size="md" icon={LucideIcon.CalendarClock}>
          This Month
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MyButtons;
