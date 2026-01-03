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
	GoRoutines  int     `json:"goroutines"`
}

func health(w http.ResponseWriter, _ *http.Request) {
	json.NewEncoder(w).Encode(Health{
		Status:    "ok",
		Timestamp: time.Now(),
	})
}

func metrics(w http.ResponseWriter, _ *http.Request) {
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
		GoRoutines:  runtime.NumGoroutine(),
	})
}

func main() {
	http.HandleFunc("/api/health", health)
	http.HandleFunc("/api/metrics", metrics)
	http.ListenAndServe(":8080", nil)
}
