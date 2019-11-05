const axios = require('axios');
const cfg = require('../jsons/config.json');
let data = require('../jsons/flare.json');
let path = require('path');
let fs = require('fs');

class methods
{
    constructor()
    {
        this.init();
    }

    async init()
    {
        this.allpath = encodeURIComponent(cfg.all);
        // this.getAll_KartoffelData();
    }

    async getVisualization(req,res)
    {  
        res.sendFile(path.join(__dirname, '../client/main.html'));
    }

    async getData(req,res)
    {
        await this.getAll_KartoffelData();
        // let groups = fs.readFileSync(path.join(__dirname,'../jsons/groups.json'),'utf8');
        // groups = JSON.parse(groups);
        res.json(this.alldata);
    }

    async getPath(req,res) // dev
    {
        let data = fs.readFileSync(path.join(__dirname,'../jsons/memes/test.json'),'utf8');
        data = JSON.parse(data);
        res.json(data);
    }

    async getGroup(req,res) // dev
    {
        let id = req.params.id;
        let data = fs.readFileSync(path.join(__dirname,'../jsons/memes/'+id+'.json'),'utf8');
        data = JSON.parse(data);
        res.json(data);
    }


    async auth()
    {
        //make all auth things here
    }

    async getAll_KartoffelData()
    {
        let pathdata = await axios.get(cfg.host+cfg.getAll+this.allpath);

        this.alldata = await this.Kartoffel_data_parse(pathdata.data);
        fs.writeFileSync(path.join(__dirname,'../jsons/groups.json'), JSON.stringify(this.alldata), 'utf8');
        console.log("done");
    }

    async Kartoffel_data_parse(group){

        let groupdata;

        if(!group.isALeaf)
        {
            groupdata = {name: group.name,children: []};

            for(let i=0; i<group.children.length; i++)
            {
                let childgroup = await this.getKartoffelGroup(group.children[i]);
                let parsedgroup = await this.Kartoffel_data_parse(childgroup);
                groupdata.children.push(parsedgroup);
            }
        }
        else
        {
            groupdata = {name: group.name,size: (Math.random()*2000)+100};
        }

        return groupdata;
    }

    async getKartoffelGroup(id)
    {
        let group = await axios.get(cfg.host + cfg.getGroup + id);
        return group.data;
    }
}

module.exports = methods;