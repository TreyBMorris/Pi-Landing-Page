package main

import (
	"encoding/json"
	"net/http"
	"runtime"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/mem"
)

type Health struct {
	Status    string    `json:"status"`
	Timestamp time.Time `json:"timestamp"`
}

type Metrics struct {
	CPUPhysical int     `json:"cpu_count"`
	CPULogical  int     `json:"cpu_logical"`
	MemoryUsed  float64 `json:"memory_used_percent"`
	DiskUsed    float64 `json:"disk_used_percent"`
}

// Probably Temp, just want to get it working
func setCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func health(w http.ResponseWriter, _ *http.Request) {
	setCORS(w)
	json.NewEncoder(w).Encode(Health{
		Status:    "ok",
		Timestamp: time.Now(),
	})
}

func metrics(w http.ResponseWriter, _ *http.Request) {
	setCORS(w)
	cpuPhysical, err := cpu.Counts(false)
	cpuLogical, _ := cpu.Counts(true)
	if err != nil {
		cpuPhysical = runtime.NumCPU()
	}
	memS, _ := mem.VirtualMemory()
	diskS, _ := disk.Usage("/")

	json.NewEncoder(w).Encode(Metrics{
		CPUPhysical: cpuPhysical,
		CPULogical:  cpuLogical,
		MemoryUsed:  memS.UsedPercent,
		DiskUsed:    diskS.UsedPercent,
	})
}

func main() {
	http.HandleFunc("/api/health", health)
	http.HandleFunc("/api/metrics", metrics)
	http.ListenAndServe(":8080", nil)
}
