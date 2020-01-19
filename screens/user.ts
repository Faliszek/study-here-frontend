export function renderName(email: string) {
  const [firstName, lastNameWithEmail] = email.split(".");

  const lastName = lastNameWithEmail.split("@")[0];

  return `${firstName[0].toUpperCase() +
    firstName.substring(1)} ${lastName[0].toUpperCase() +
    lastName.substring(1)}`;
}

export function renderInitials(email: string) {
  const [firstName, lastName] = email.split(".");
  return firstName[0].toUpperCase() + lastName[0].toUpperCase();
}

//this function for every char in part get value ascii
//so max value (small z = 122) is 122 * 8, and then we get % 200 to get valid color
function reducePartOfIdToColor(partId: string) {
  let val = partId.split("").reduce((acc, sign) => {
    return acc + Number(sign.charCodeAt(0) - 65);
  }, 0);

  return val % 200;
}

export function getColor(id: string) {
  const splitValue = Math.floor(id.length / 3);
  const [r, g, b] = [
    id.slice(0, splitValue),
    id.slice(splitValue, splitValue * 2),
    id.slice(splitValue * 2, splitValue * 3)
  ];

  const [red, green, blue] = [
    reducePartOfIdToColor(r),
    reducePartOfIdToColor(g),
    reducePartOfIdToColor(b)
  ];

  return `rgb(${red},${green} ,${blue} )`;
}
