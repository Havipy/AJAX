const xmlString = `
	<list>
		<student>
			<name lang="en">
				<first>Ivan</first>
				<second>Ivanov</second>
			</name>
			<age>35</age>
			<prof>teacher</prof>
		</student>
		<student>
			<name lang="ru">
				<first>Петр</first>
				<second>Петров</second>
			</name>
			<age>58</age>
			<prof>driver</prof>
		</student>
	</list>
`;
const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const listNode = xmlDOM.querySelector("list");
const studentNodes = [...listNode.querySelectorAll("student")];
const list = [];
for (let student of studentNodes) {
	const nameNode = student.querySelector('name');
	list.push({
		name: `${nameNode.firstElementChild.textContent} ${nameNode.lastElementChild.textContent}`,
		lang: nameNode.getAttribute('lang'),
		prof: student.querySelector('prof').textContent,
		age: Number(student.querySelector('age').textContent),
	})
}

const result = {
	list: list,
}
console.log(result);