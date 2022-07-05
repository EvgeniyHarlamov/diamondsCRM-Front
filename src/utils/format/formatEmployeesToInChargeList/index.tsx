import { DropdownItem } from "../../../types";
import { EmployeeT } from "../../../types/employees";

function formatEmployeesToInChargeList(employees:Array<EmployeeT>, valueType = 'id') {
    return employees.map((employee) => {
        let idData:DropdownItem =  {
            label: employee.name,
            value: employee.id
        };
        let nameData:DropdownItem =  {
            label: employee.name,
            value: employee.name
        };
        if (valueType === 'id') return idData;
        return nameData;
        }
    );
}

export default formatEmployeesToInChargeList;