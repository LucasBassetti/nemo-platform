var relationshipsKeys =
{
	"a" : "access",
	"c" : "composition",
}

var rules = 
{
	"BusinessActor": [
		{
			"target": "BusinessRole",
			"relationships": ["a", "c"],
		}
	] 
	
}