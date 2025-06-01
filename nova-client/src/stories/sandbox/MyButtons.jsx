import {
  Check,
  CircleCheck,
  ClipboardCheck,
  FilePenLine,
  ListCheck,
  PrinterCheck,
  Save,
  Trash2,
} from "lucide-react";

import Button from "../../components/ui/Button";
import ButtonGroup from "../../components/ui/ButtonGroup";
import IconButton from "../../components/ui/IconButton";
import { LucideIcon } from "../../lib/LucideIcons";

const MyButtons = () => {
  return (
    <div className="bg-base-50 p-6 rounded-lg shadow space-y-6">
      {/* 1️⃣ Normal buttons with icon, loading */}
      <div className="flex gap-4">
        <Button variant="primary" icon={LucideIcon.Save}>
          Save
        </Button>
        <Button variant="success" icon={LucideIcon.CircleCheck}>
          Success Button
        </Button>
        <Button variant="secondary" icon={LucideIcon.ClipboardCheck}>
          Button
        </Button>
        <Button variant="danger" loading>
          Deleting
        </Button>
        <Button variant="green" icon={LucideIcon.CircleCheck}>
          Green
        </Button>
        <Button variant="green" disabled>
          Disabled
        </Button>
        <Button variant="muted">Muted Button</Button>
        {/* <Button variant="outline">Outline Button</Button> */}
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="cyan" icon={PrinterCheck}>
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
        <Button variant="ghost" icon={LucideIcon.Clock}>
          Today
        </Button>
        <Button variant="ghost" icon={LucideIcon.CalendarDays}>
          This Week
        </Button>
        <Button variant="ghost" icon={LucideIcon.CalendarClock}>
          This Month
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MyButtons;
