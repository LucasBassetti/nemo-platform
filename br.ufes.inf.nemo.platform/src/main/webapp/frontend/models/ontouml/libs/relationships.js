/*
 * Template:
 * {
 * 		"relationshipKey1": "relationshipName1",
 * 		"relationshipKey3": "relationshipName2",
 * 		...
 * }
 */

relationshipsKeys =
{
	"a" : "association",
	"b" : "memberOf",
	"c" : "componentOf",
	"d"	: "mediation",
	"f"	: "formal",
	"h" : "characterization",
	"m" : "material",
	"q" : "subQuantityOf",
	"s" : "specialization",
	"u" : "subCollectionOf",
};

/*
 * Template:
 * {
 * 		"source": {
 * 			"target": ["relationshipKey1", relationshipKey2", ...],
 * 			"target": ["relationshipKey1", relationshipKey2", ...],
 * 			...
 * 		},
 * 		"source": {
 * 			"target": ["relationshipKey1", relationshipKey2", ...],
 * 			"target": ["relationshipKey1", relationshipKey2", ...],
 * 			...
 * 		},
 * ...
 * }
 */

relationships = 
{
		"Kind": {
			"Kind" : ["a","c","f","m"],
			"Subkind" : ["a","f","m"],
		}
}