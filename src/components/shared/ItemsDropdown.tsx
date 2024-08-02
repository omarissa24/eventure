import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  items: any[];
  placeholder: string;
  isUsersDropdown?: boolean;
};

const ItemsDropdown = ({
  value,
  onChangeHandler,
  items,
  placeholder,
  isUsersDropdown,
}: DropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className='select-field'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {isUsersDropdown ? (
        <SelectContent>
          {items.length > 0 &&
            items.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
                className='select-item p-regular-14'
              >
                {item.firstName} {item.lastName}
              </SelectItem>
            ))}
        </SelectContent>
      ) : (
        <SelectContent>
          {items.length > 0 &&
            items.map((item) => (
              <SelectItem
                key={item._id}
                value={item._id}
                className='select-item p-regular-14'
              >
                {item.title}
              </SelectItem>
            ))}
        </SelectContent>
      )}
    </Select>
  );
};

export default ItemsDropdown;
