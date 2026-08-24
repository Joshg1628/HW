'use strict';
// practicing closures and hiding data

function trackDosage(medicationName, initialDosage) {
    let dosage = initialDosage;
    const medication = medicationName;
    const Doctorpin = 1234;
   return {
    instructions(){
        return `Take ${dosage} mg of ${medication} daily.`;
    },  
    updateDosage(pin ,newDosage) {
        if (pin === Doctorpin && newDosage > 0) {
            dosage = newDosage;
            return `Dosage updated to ${dosage} mg.`;
        } else {
            console.log('Invalid pin or dosage. Dosage not updated.');
        }
    }
};
};

// testing

const patient = trackDosage('Aspirin', 50);
console.log(patient.instructions());    

patient.updateDosage(1234, 75);
console.log(patient.instructions());

patient.updateDosage(9999, 100);             
console.log(patient.instructions());  

patient.updateDosage(1234, -10);      
console.log(patient.instructions()); 

// prove the data is actually private
console.log(patient.medication);  // undefined
console.log(patient.dosage);  // undefined
